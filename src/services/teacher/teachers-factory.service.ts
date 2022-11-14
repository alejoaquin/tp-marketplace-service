import { Injectable } from '@nestjs/common';
import { BasicTeacherDto, TeacherEntity } from 'src/domain';

@Injectable()
export class TeachersFactoryService {
    toBasicDto(entity: TeacherEntity): BasicTeacherDto {
        const dto = new BasicTeacherDto();
        dto.id = entity.id;
        dto.name = entity.firstname;
        dto.lastname = entity.lastname;
        dto.experience = entity.experience;
        dto.title = entity.title;
        return dto;
    }
}
