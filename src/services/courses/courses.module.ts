import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from 'src/controllers/courses.controller';
import { CourseEntity, TeacherEntity } from 'src/domain';
import { CommentEntity } from 'src/domain/entities/comment.entity';
import { CoursesService } from './courses.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherEntity, CourseEntity, CommentEntity]),
    ],
    providers: [CoursesService],
    controllers: [CoursesController],
    exports: [CoursesService],
})
export class CoursesModule {}
