import { Injectable } from '@nestjs/common';
import { Roles, UserDto } from 'src/domain';
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

    async getAll(): Promise<UserDto[]> {
        const teachers = await this.teachersService.getAll();
        const students = await this.studentsService.getAll();

        return [...teachers, ...students];
    }

    async getById(id: string): Promise<UserDto> {
        try {
            const user = await this.teachersService.getById(id);
            return user ? user : this.studentsService.getById(id);
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    create(user: UserDto): Promise<UserDto> {
        try {
            return user.role === Roles.STUDENT_ROLE
                ? this.studentsService.create(
                      this.usersFactoryService.userDtoToStudentDto(user),
                  )
                : this.teachersService.create(
                      this.usersFactoryService.userDtoToTeacherDto(user),
                  );
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    async delete(id: string): Promise<UserDto> {
        const user = this.teachersService.delete(id);
        return user ? user : this.studentsService.delete(id);
    }
}
