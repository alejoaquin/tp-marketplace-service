import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import {
    CommentEntity,
    CourseEntity,
    RatingEntity,
    TeacherEntity,
} from 'src/domain';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TeacherEntity,
            CourseEntity,
            CommentEntity,
            RatingEntity,
        ]),
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
