import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from 'src/controllers/teachers.controller';
import { CourseEntity, TeacherEntity } from 'src/domain';
import { TeachersFactoryService } from './teachers-factory.service';
import { TeachersService } from './teachers.service';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity, CourseEntity])],
    providers: [TeachersService, TeachersFactoryService],
    controllers: [TeachersController],
    exports: [TeachersService, TeachersFactoryService],
})
export class TeachersModule {}
