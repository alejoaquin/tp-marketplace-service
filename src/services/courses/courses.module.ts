import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import { CourseEntity, RatingEntity, TeacherEntity } from 'src/domain';
import { CommentsModule } from '../comments/comments.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';
import { RatingsModule } from '../ratings/ratings.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { StudentsModule } from '../students/students.module';
import { TeachersModule } from '../teacher/teachers.module';
import { UsersModule } from '../users/users.module';
import { CoursesFactoryService } from './courses.factory.service';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherEntity, CourseEntity, RatingEntity]),
        StudentsModule,
        CommentsModule,
        InscriptionsModule,
        UsersModule,
        TeachersModule,
        RatingsModule,
        NotificationsModule,
    ],
    providers: [CoursesService, CoursesFactoryService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
