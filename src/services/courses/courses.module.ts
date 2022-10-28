import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import {
    CourseEntity,
    InscriptionEntity,
    RatingEntity,
    TeacherEntity,
} from 'src/domain';
import { CommentsModule } from '../comments/comments.module';
import { StudentsModule } from '../students/students.module';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TeacherEntity,
            CourseEntity,
            RatingEntity,
            InscriptionEntity,
        ]),
        StudentsModule,
        CommentsModule,
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
