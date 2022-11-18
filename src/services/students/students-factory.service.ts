import { Injectable } from '@nestjs/common';
import { StudentEntity, UserBasicInfoDto } from 'src/domain';

@Injectable()
export class StudentsFactoryService {
    toBasicDto(entity: StudentEntity): UserBasicInfoDto {
        const dto = new UserBasicInfoDto();
        dto.id = entity.id;
        dto.name = entity.firstname;
        dto.lastname = entity.lastname;
        return dto;
    }
}
