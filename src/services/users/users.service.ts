import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/domain';
import { Roles } from 'src/domain/enums/role.enum';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teacher/teachers.service';
import { UsersFactoryService } from './users-factory.service';

@Injectable()
export class UsersService {
    constructor(
        private teachersService: TeachersService,
        private studentsService: StudentsService,
        private usersFactoryService: UsersFactoryService,
    ) {}

    async getAll(): Promise<UserEntity[]> {
        const teachers = await this.teachersService.getAll();
        const students = await this.studentsService.getAll();

        return [...teachers, ...students];
    }

    async getById(id: string): Promise<UserEntity> {
        try {
            const user = await this.teachersService.getById(id);
            return user ? user : this.studentsService.getById(id);
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    create(user: UserEntity): Promise<UserEntity> {
        try {
            return user.role === Roles.STUDENT_ROLE
                ? this.studentsService.create(
                      this.usersFactoryService.userToStudent(user),
                  )
                : this.teachersService.create(
                      this.usersFactoryService.userToTeacher(user),
                  );
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    async delete(id: string): Promise<UserEntity> {
        const user = this.teachersService.delete(id);
        return user ? user : this.studentsService.delete(id);
    }
}
