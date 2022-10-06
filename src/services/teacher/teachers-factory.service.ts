import { Injectable } from '@nestjs/common';
import { TeacherDto } from 'src/domain/dtos/teacher.dto';
import { TeacherEntity } from 'src/domain/entities/teacher.entity';

@Injectable()
export class TeachersFactoryService {
    toEntity(teacherDto: TeacherDto): TeacherEntity {
        const teacherEntity = new TeacherEntity(
            teacherDto.id,
            teacherDto.firstname,
            teacherDto.lastname,
            teacherDto.phone,
            teacherDto.email,
            teacherDto.password,
            teacherDto.role,
        );
        teacherEntity.experience = teacherDto.experience;
        teacherEntity.title = teacherDto.title;
        return teacherEntity;
    }

    toDto(teacherEntity: TeacherEntity): TeacherDto {
        const teacherDto = new TeacherDto(
            teacherEntity.id,
            teacherEntity.firstname,
            teacherEntity.lastname,
            teacherEntity.phone,
            teacherEntity.email,
            teacherEntity.password,
            teacherEntity.role,
        );
        teacherDto.experience = teacherEntity.experience;
        teacherDto.title = teacherEntity.title;
        return teacherDto;
    }
}
