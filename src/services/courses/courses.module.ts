import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import {
    CommentEntity,
    CourseEntity,
    InscriptionEntity,
    RatingEntity,
    TeacherEntity,
} from 'src/domain';
import { StudentsModule } from '../students/students.module';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TeacherEntity,
            CourseEntity,
            CommentEntity,
            RatingEntity,
            InscriptionEntity,
        ]),
        StudentsModule,
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
