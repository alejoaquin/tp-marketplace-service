import { Injectable } from '@nestjs/common';
import { Role, StudentDto, StudentEntity, UserBasicInfoDto } from 'src/domain';

@Injectable()
export class StudentsFactoryService {
    toBasicDto(entity: StudentEntity): UserBasicInfoDto {
        const dto = new UserBasicInfoDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        return dto;
    }

    toCompleteDto(entity: StudentEntity): StudentDto {
        const dto = new StudentDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        dto.phone = entity.phone;
        dto.email = entity.email;
        dto.role = entity.role;
        dto.password = entity.password;
        dto.birthday = entity.birthday;
        dto.educationalDegrees = entity.educationalDegrees;
        return dto;
    }

    toEntity(dto: StudentDto): StudentEntity {
        const entity = new StudentEntity(
            dto.id,
            dto.firstname,
            dto.lastname,
            dto.phone,
            dto.email,
            dto.password,
            Role.STUDENT_ROLE,
        );
        entity.birthday = dto.birthday;
        entity.educationalDegrees = dto.educationalDegrees;
        return entity;
    }
}
