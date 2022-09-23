import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import config from './configuration/data-source';
import { UserEntity } from './models';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature(UserEntity),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
