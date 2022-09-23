import { Injectable } from '@nestjs/common';
import { StudentDto } from 'src/domain';
import { StudentEntity } from 'src/domain';

@Injectable()
export class StudentFactoryService {
    createNewStudent(studentDto: StudentDto): StudentEntity {
        const newStudent = new StudentEntity(
            studentDto.firstname,
            studentDto.lastname,
            studentDto.phone,
            studentDto.email,
            studentDto.password,
            studentDto.role,
            studentDto.notifications,
        );
        newStudent.birthday = studentDto.birthday;
        newStudent.educationalDegrees = studentDto.educationalDegrees;
        newStudent.courseRequests = studentDto.courseRequests;
        newStudent.comments = studentDto.comments;
        newStudent.scorings = studentDto.scorings;
        newStudent.courses = studentDto.courses;

        return newStudent;
    }
}
