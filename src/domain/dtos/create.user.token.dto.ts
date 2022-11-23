import { IsDateString, IsString } from 'class-validator';

export class CreateUserTokenDto {
    @IsString()
    id: string;
    @IsString()
    token: string;
    @IsDateString()
    expireAt: string;
}
