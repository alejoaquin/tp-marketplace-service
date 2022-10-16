import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from 'src/controllers/teachers.controller';
import { CourseEntity, TeacherEntity } from 'src/domain';
import { CommentEntity } from 'src/domain/entities/comment.entity';
import { TeachersService } from './teachers.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TeacherEntity, CourseEntity, CommentEntity]),
    ],
    providers: [TeachersService],
    controllers: [TeachersController],
    exports: [TeachersService],
})
export class TeachersModule {}
