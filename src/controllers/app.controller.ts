import {
    Body,
    Controller,
    HttpCode,
    Post,
    Request,
    ValidationPipe,
} from '@nestjs/common';
import {
    AuthenticatedUserDto,
    ForgotPasswordRequest,
    SignInRequest,
} from 'src/domain';
import { AuthService } from 'src/services/auth/auth.service';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Post('/signIn')
    async signIn(
        @Body(new ValidationPipe()) signInDto: SignInRequest,
    ): Promise<AuthenticatedUserDto> {
        return await this.authService.login(signInDto);
    }

    @Post('/forgotPassword')
    @HttpCode(200)
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
