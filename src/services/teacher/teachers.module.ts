import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from 'src/controllers/teachers.controller';
import { CommentEntity, CourseEntity, TeacherEntity } from 'src/domain';
import { TeachersService } from './teachers.service';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity, CourseEntity])],
    providers: [TeachersService],
    controllers: [TeachersController],
    exports: [TeachersService],
})
export class TeachersModule {}
