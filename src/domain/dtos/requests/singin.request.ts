import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInRequest {
    @IsEmail()
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}
