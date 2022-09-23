import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import config from './configuration/data-source';

@Module({
    imports: [TypeOrmModule.forRoot(config)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
