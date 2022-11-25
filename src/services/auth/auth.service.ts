import {
    BadRequestException,
    Injectable,
    MethodNotAllowedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import * as moment from 'moment';
import {
    AuthenticatedUserDto,
    CreateTokenRequest,
    ForgotPasswordRequest,
    SignInRequest,
    TokenEntity,
    UserDto,
} from 'src/domain';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mails/mail.service';
import { ITokenPayload } from '../token/interface/token.payload';
import { TokenService } from '../token/token.service';
import { UsersFactoryService } from '../users/users-factory.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private usersFactoryService: UsersFactoryService,
        private jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) {}

    async login({
        email,
        password,
    }: SignInRequest): Promise<AuthenticatedUserDto> {
        const user = await this.usersService.findByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = await this.signUser(user);
            const authenticatedUser =
                this.usersFactoryService.toAuthenticatedUser(user);
            authenticatedUser.accessToken = token;
            return authenticatedUser;
        }
        throw new BadRequestException('Invalid credentials');
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

    async forgotPassword(
        forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        const user = await this.usersService.findByEmail(
            forgotPasswordDto.email,
        );
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        const newPass = uuid();
        user.password = this.usersService.hashPassword(newPass);
        await this.usersService.update({
            id: user.id,
            role: user.role,
            password: user.password,
        });

        await this.mailService.send({
            from: this.configService.get<string>('MAIL_ACCOUNT'),
            to: user.email,
            subject: 'Nueva Contraseña para TP Marketplace',
            html:
                '<h1> Se ha generado su nueva contraseña para ingresar a TP Marketplace:  </h1><h3>' +
                newPass +
                '</h3>',
        });
    }

    private async generateToken(
        data: ITokenPayload,
        options?: SignOptions,
    ): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private saveToken(
        createUserTokenDto: CreateTokenRequest,
    ): Promise<TokenEntity> {
        return this.tokenService.create(createUserTokenDto);
    }
}
