import { Injectable } from '@nestjs/common';
import { StudentEntity, TeacherEntity, UserEntity } from 'src/domain';

@Injectable()
export class UsersFactoryService {
    userToTeacher(user: UserEntity): TeacherEntity {
        const teacher = new TeacherEntity(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return teacher;
    }

    userToStudent(user: UserEntity): StudentEntity {
        const student = new StudentEntity(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return student;
    }
}
