import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailDto } from 'src/domain';

@Injectable()
export class MailService {
    private credentials: { user: string; pass: string };
    constructor(private readonly configService: ConfigService) {
        this.credentials = {
            user: this.configService.get<string>('MAIL_ACCOUNT'),
            pass: this.configService.get<string>('MAIL_PASS'),
        };
    }

    async send(data: MailDto): Promise<void> {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: false,
            port: 25,
            service: 'Gmail',
            auth: this.credentials,
        });
        // Definimos el email
        var mailOptions = {
            from: data.from,
            to: data.to,
            subject: data.subject,
            html: data.html,
        };
        console.log('mail', mailOptions);
        // Enviamos el email
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.log('Error envio mail: ', error);
        }
    }
}
