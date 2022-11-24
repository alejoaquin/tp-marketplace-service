import { Injectable } from '@nestjs/common';
import { Role, TeacherDto, TeacherEntity } from 'src/domain';

@Injectable()
export class TeachersFactoryService {
    toDto(entity: TeacherEntity): TeacherDto {
        const dto = new TeacherDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        dto.experience = entity.experience;
        dto.title = entity.title;
        dto.phone = entity.phone;
        dto.email = entity.email;
        dto.role = entity.role;
        return dto;
    }

    toEntity(dto: TeacherDto): TeacherEntity {
        const entity = new TeacherEntity(
            dto.id,
            dto.firstname,
            dto.lastname,
            dto.phone,
            dto.email,
            dto.password,
            Role.TEACHER_ROLE,
        );
        entity.experience = dto.experience;
        entity.title = dto.title;
        return entity;
    }
}
