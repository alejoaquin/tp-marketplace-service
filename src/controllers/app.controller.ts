import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { ForgotPasswordRequest } from 'src/domain';
import { AuthService } from 'src/services/auth/auth.service';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('/forgotPassword')
    @HttpCode(200)
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
