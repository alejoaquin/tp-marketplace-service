import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users.controller';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teacher/teachers.module';
import { UsersFactoryService } from './users-factory.service';
import { UsersService } from './users.service';

@Module({
    imports: [TeachersModule, StudentsModule],
    providers: [UsersService, UsersFactoryService],
    controllers: [UsersController],
})
export class UsersModule {}
