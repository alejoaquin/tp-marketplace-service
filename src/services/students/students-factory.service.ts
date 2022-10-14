import { Injectable } from '@nestjs/common';
import { Roles, StudentDto, StudentEntity } from 'src/domain';
import { EducationFactoryService } from './education-factory.service';

@Injectable()
export class StudentsFactoryService {
    constructor(private educationFactoryService: EducationFactoryService) {}

    toEntity(studentDto: StudentDto): StudentEntity {
        const studentEntity = new StudentEntity(
            studentDto.id,
            studentDto.firstname,
            studentDto.lastname,
            studentDto.phone,
            studentDto.email,
            studentDto.password,
            studentDto.role,
        );
        studentEntity.birthday = studentDto.birthday;
        studentEntity.educationalDegrees = studentDto.educationalDegrees.map(
            (dto) => this.educationFactoryService.toEntity(dto),
        );

        studentEntity.educationalDegrees.forEach(
            (edu) => (edu.student = studentEntity),
        );
        return studentEntity;
    }

    toDto(studentEntity: StudentEntity): StudentDto {
        const studentDto = new StudentDto(
            studentEntity.id,
            studentEntity.firstname,
            studentEntity.lastname,
            studentEntity.phone,
            studentEntity.email,
            studentEntity.password,
            Roles.STUDENT_ROLE,
        );
        studentDto.birthday = studentEntity.birthday;
        studentDto.educationalDegrees = studentEntity.educationalDegrees.map(
            (entity) => this.educationFactoryService.toDto(entity),
        );
        return studentDto;
    }
}
