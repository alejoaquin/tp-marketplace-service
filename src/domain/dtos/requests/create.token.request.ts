import { IsDateString, IsString } from 'class-validator';

export class CreateUserTokenRequest {
    @IsString()
    id: string;
    @IsString()
    token: string;
    @IsDateString()
    expireAt: string;
}
