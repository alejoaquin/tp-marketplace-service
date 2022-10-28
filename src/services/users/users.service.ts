import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { UserEntity } from 'src/domain';
import { Role } from 'src/domain/enums/role.enum';
import { EntityNotFoundError } from 'typeorm';
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
        return this.studentsService.getById(id).catch((err) => {
            if (err instanceof EntityNotFoundError)
                return this.teachersService.getById(id);
        });
    }

    create(user: UserEntity): Promise<UserEntity> {
        return user.role === Role.STUDENT_ROLE
            ? this.studentsService.create(
                  this.usersFactoryService.userToStudent(user),
              )
            : this.teachersService.create(
                  this.usersFactoryService.userToTeacher(user),
              );
    }
}
