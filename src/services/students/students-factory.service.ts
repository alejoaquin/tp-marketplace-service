import { Injectable } from '@nestjs/common';
import { StudentDto, StudentEntity } from 'src/domain';

@Injectable()
export class StudentsFactoryService {
    createNewStudent(studentDto: StudentDto): StudentEntity {
        const newStudent = new StudentEntity(
            studentDto.firstname,
            studentDto.lastname,
            studentDto.phone,
            studentDto.email,
            studentDto.password,
            studentDto.role,
        );
        newStudent.birthday = studentDto.birthday;
        return newStudent;
    }
}
