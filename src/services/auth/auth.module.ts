import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from '../mails/mail.module';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('SERVICE_SECRET'),
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
        TokenModule,
        MailModule,
    ],

    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
