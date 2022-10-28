import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import { CourseEntity, RatingEntity, TeacherEntity } from 'src/domain';
import { CommentsModule } from '../comments/comments.module';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';
import { StudentsModule } from '../students/students.module';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherEntity, CourseEntity, RatingEntity]),
        StudentsModule,
        CommentsModule,
        InscriptionsModule,
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
