import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/domain';
import { TokenService } from './token.service';

@Module({
    imports: [TypeOrmModule.forFeature([TokenEntity])],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule {}
