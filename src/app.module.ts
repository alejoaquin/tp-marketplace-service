import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from './configuration/data-source';
import { AppController } from './controllers/app.controller';
import { StudentsModule } from './services/students/students.module';
import { TeachersModule } from './services/teacher/teachers.module';
import { UsersModule } from './services/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        StudentsModule,
        TeachersModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
