import { Injectable } from '@nestjs/common';
import { StudentDto, UserDto } from 'src/domain';
import { TeacherDto } from 'src/domain/dtos/teacher.dto';

@Injectable()
export class UsersFactoryService {
    userDtoToTeacherDto(user: UserDto): TeacherDto {
        const teacherDto = new TeacherDto(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return teacherDto;
    }

    userDtoToStudentDto(user: UserDto): StudentDto {
        const studentDto = new StudentDto(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return studentDto;
    }
}
