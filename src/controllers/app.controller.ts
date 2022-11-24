import {
    Body,
    Controller,
    HttpCode,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ForgotPasswordRequest } from 'src/domain';
import { Public } from 'src/public.decorator';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalAuthGuard } from 'src/services/auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Public()
    @Post('/forgotPassword')
    @HttpCode(200)
    async forgotPassword(
        @Body() forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
