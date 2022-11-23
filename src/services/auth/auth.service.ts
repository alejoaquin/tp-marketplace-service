import {
    BadRequestException,
    Injectable,
    MethodNotAllowedException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import * as moment from 'moment';
import {
    AuthenticatedUserDto,
    ChangePasswordRequest,
    CreateUserRequest,
    CreateUserTokenDto,
    ITokenPayload,
    SignInDto,
    TokenEntity,
    UserDto,
} from 'src/domain';
import { ForgotPasswordRequest } from 'src/domain/dtos/requests/forgot.password.request';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mail/mail.service';
import { UsersFactoryService } from '../users/users-factory.service';
import { UsersService } from '../users/users.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;
    constructor(
        private usersService: UsersService,
        private usersFactoryService: UsersFactoryService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
    ) {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (bcrypt.compareSync(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            userId: user.id,
        };
    }

    async signUp(createUserDto: CreateUserRequest): Promise<boolean> {
        const user = await this.usersService.create(
            this.usersFactoryService.createRequestToEntity(createUserDto),
        );
        return true;
    }

    async signIn({
        email,
        password,
    }: SignInDto): Promise<AuthenticatedUserDto> {
        const user = await this.usersService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.signUser(user);
            const authenticatedUser =
                this.usersFactoryService.toAuthenticatedUser(user);
            authenticatedUser.accessToken = token;

            return authenticatedUser;
        }
        throw new BadRequestException('Credenciales inválidas');
    }

    async signUser(
        user: UserDto,
        withStatusCheck: boolean = true,
    ): Promise<string> {
        if (withStatusCheck) {
            throw new MethodNotAllowedException();
        }
        const tokenPayload: ITokenPayload = {
            id: user.id,
            role: user.role,
        };
        const token = await this.generateToken(tokenPayload);
        const expireAt = moment().add(1, 'day').toISOString();

        await this.saveToken({
            token,
            expireAt,
            id: user.id,
        });

        return token;
    }

    async changePassword(
        userId: string,
        changePasswordDto: ChangePasswordRequest,
    ): Promise<boolean> {
        const password = await this.usersService.hashPassword(
            changePasswordDto.password,
        );

        await this.usersService.update(userId, { password });
        await this.tokenService.deleteAll(userId);
        return true;
    }

    private async generateToken(
        data: ITokenPayload,
        options?: SignOptions,
    ): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private saveToken(
        createUserTokenDto: CreateUserTokenDto,
    ): Promise<TokenEntity> {
        return this.tokenService.create(createUserTokenDto);
    }

    private async verifyToken(token): Promise<any> {
        const data = this.jwtService.verify(token) as ITokenPayload;
        const tokenExists = await this.tokenService.exists(data.id, token);

        if (tokenExists) {
            return data;
        }
        throw new UnauthorizedException();
    }

    async forgotPassword(
        forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        const user = await this.usersService.findByEmail(
            forgotPasswordDto.email,
        );
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        const changePasswordRequest = new ChangePasswordRequest();
        changePasswordRequest.password = uuid();
        this.changePassword(user.id, changePasswordRequest);

        await this.mailService.send({
            from: this.configService.get<string>('MAIL_ACCOUNT'),
            to: user.email,
            subject: 'Nueva Contraseña para TP Marketplace',
            html:
                '<h1> Se ha generado su nueva contraseña para ingresar a TP Marketplace:  </h1><h3>' +
                changePasswordRequest.password +
                '</h3>',
        });
    }
}
