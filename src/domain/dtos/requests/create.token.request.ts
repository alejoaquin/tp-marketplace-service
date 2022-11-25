import { IsDateString, IsString } from 'class-validator';

export class CreateTokenRequest {
    @IsString()
    id: string;
    @IsString()
    token: string;
    @IsDateString()
    expireAt: string;
}
