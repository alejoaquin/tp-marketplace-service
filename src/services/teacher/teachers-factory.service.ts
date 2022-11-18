import { Injectable } from '@nestjs/common';
import { TeacherDto, TeacherEntity } from 'src/domain';

@Injectable()
export class TeachersFactoryService {
    toDto(entity: TeacherEntity): TeacherDto {
        const dto = new TeacherDto();
        dto.id = entity.id;
        dto.name = entity.firstname;
        dto.lastname = entity.lastname;
        dto.experience = entity.experience;
        dto.title = entity.title;
        dto.phone = entity.phone;
        dto.email = entity.email;
        dto.role = entity.role;
        return dto;
    }
}
