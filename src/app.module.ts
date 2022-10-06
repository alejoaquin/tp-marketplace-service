import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from './configuration/data-source';
import { AppController } from './controllers/app.controller';
import { StudentsModule } from './services/students/students.module';
import { TeachersModule } from './services/teacher/teachers.module';

@Module({
    imports: [TypeOrmModule.forRoot(config), StudentsModule, TeachersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
