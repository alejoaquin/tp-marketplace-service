import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/domain';
import { Role } from 'src/domain/enums/role.enum';
import { EntityNotFoundError } from 'typeorm';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teacher/teachers.service';
import { UsersFactoryService } from './users-factory.service';

@Injectable()
export class UsersService {
    private readonly saltRounds = 8;
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
        user.password = this.hashPassword(user.password);
        return user.role === Role.STUDENT_ROLE
            ? this.studentsService.create(
                  this.usersFactoryService.userToStudent(user),
              )
            : this.teachersService.create(
                  this.usersFactoryService.userToTeacher(user),
              );
    }

    update(user: Partial<UserEntity>): Promise<void> {
        return user.role === Role.STUDENT_ROLE
            ? this.studentsService.updatePartial(user.id, user)
            : this.teachersService.updatePartial(user.id, user);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.studentsService.getByEmail(email).catch((err) => {
            if (err instanceof EntityNotFoundError)
                return this.teachersService.getByEmail(email);
        });
    }

    hashPassword(pass: string): string {
        return bcrypt.hashSync(pass, this.saltRounds);
    }
}
