import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teacher/teachers.module';
import { UsersFactoryService } from './users-factory.service';
import { UsersService } from './users.service';

@Module({
    imports: [TeachersModule, StudentsModule, NotificationsModule],
    providers: [UsersService, UsersFactoryService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
