import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Role } from 'src/domain/enums';

export class CreateUserRequest {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly firstname: string;

    @IsString()
    @IsNotEmpty()
    readonly lastname: string;

    @IsNumber()
    @IsOptional()
    readonly phone: number;

    @IsString()
    readonly role: Role;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
