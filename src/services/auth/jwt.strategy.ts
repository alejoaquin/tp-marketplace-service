import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/domain';
import { TokenService } from '../token/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private readonly tokenService: TokenService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('SERVICE_SECRET'),
            passReqToCallback: true,
        });
    }

    async validate(req, user: Partial<UserDto>) {
        const token = req.headers.authorization.slice(7);
        const tokenExists = await this.tokenService.exists(user.id, token);
        if (tokenExists) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }
}
