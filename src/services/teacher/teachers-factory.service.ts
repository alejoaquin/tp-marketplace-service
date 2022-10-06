import { Injectable } from '@nestjs/common';
import { TeacherDto } from 'src/domain/dtos/teacher.dto';
import { TeacherEntity } from 'src/domain/entities/teacher.entity';

@Injectable()
export class TeachersFactoryService {
    createNewTeacher(teacherDto: TeacherDto): TeacherEntity {
        const newTeacher = new TeacherEntity(
            teacherDto.firstname,
            teacherDto.lastname,
            teacherDto.phone,
            teacherDto.email,
            teacherDto.password,
            teacherDto.role,
        );
        newTeacher.experience = teacherDto.experience;
        newTeacher.title = teacherDto.title;
        return newTeacher;
    }
}
