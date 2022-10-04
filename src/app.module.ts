import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from './configuration/data-source';
import { AppController } from './controllers/app.controller';
import { StudentsModule } from './services/students/students.module';

@Module({
    imports: [TypeOrmModule.forRoot(config), StudentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
