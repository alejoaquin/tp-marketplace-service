import { Injectable } from '@nestjs/common';
import { StudentDto } from 'src/domain';
import { StudentEntity } from 'src/domain';

@Injectable()
export class StudentService {
    createNewStudent(studentDto: StudentDto) {
        const newStudent = new StudentEntity(
            studentDto.id,
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

/*
createNewAuthor(createAuthorDto: CreateAuthorDto) {
    const newAuthor = new Author();
    newAuthor.firstName = createAuthorDto.firstName;
    newAuthor.lastName = createAuthorDto.lastName;

    return newAuthor;
  }
  */
