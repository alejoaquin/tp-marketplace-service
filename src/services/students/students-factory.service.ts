import { Injectable } from '@nestjs/common';
import { Roles, StudentDto, StudentEntity } from 'src/domain';

@Injectable()
export class StudentsFactoryService {
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
        return studentDto;
    }
}
