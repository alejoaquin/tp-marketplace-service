import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthenticatedUserDto, CreateUserRequest, SignInDto } from 'src/domain';
import { ForgotPasswordRequest } from 'src/domain/dtos/requests/forgot.password.request';
import { AuthService } from 'src/services/auth/auth.service';

@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signUp')
    async signUp(
        @Body(new ValidationPipe()) createUserDto: CreateUserRequest,
    ): Promise<boolean> {
        return this.authService.signUp(createUserDto);
    }

    @Post('/signIn')
    async signIn(
        @Body(new ValidationPipe()) signInDto: SignInDto,
    ): Promise<AuthenticatedUserDto> {
        return await this.authService.signIn(signInDto);
    }

    @Post('/forgotPassword')
    async forgotPassword(
        @Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordRequest,
    ): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
