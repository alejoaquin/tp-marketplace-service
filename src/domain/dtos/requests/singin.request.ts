import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
}
