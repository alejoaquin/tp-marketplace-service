import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/public.decorator';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalAuthGuard } from 'src/services/auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
