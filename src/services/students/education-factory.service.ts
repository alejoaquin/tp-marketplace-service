import { Injectable } from '@nestjs/common';
import { Roles, EducationDto, EducationEntity } from 'src/domain';

@Injectable()
export class EducationFactoryService {
    toEntity(educationDto: EducationDto): EducationEntity {
        const education = new EducationEntity();
        education.description = educationDto.description;
        education.status = educationDto.description;
        education.level = educationDto.description;
        return education;
    }

    toDto(educationEntity: EducationEntity): EducationDto {
        const education = new EducationDto();
        education.description = educationEntity.description;
        education.status = educationEntity.description;
        education.level = educationEntity.description;
        return education;
    }
}
