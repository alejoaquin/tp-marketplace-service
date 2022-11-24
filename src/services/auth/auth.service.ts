import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordRequest } from 'src/domain';
import { v4 as uuid } from 'uuid';
import { MailService } from '../mails/mail.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
    ) {}

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
        console.log('new pass: ', newPass);
        user.password = this.usersService.hashPassword(newPass);
        await this.usersService.update(user);

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
}
