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

    async create(user: UserEntity): Promise<UserEntity> {
        user.password = await this.hashPassword(user.password);
        console.log('user: ', user);
        return user.role === Role.STUDENT_ROLE
            ? this.studentsService.create(user)
            : this.teachersService.create(
                  this.usersFactoryService.userToTeacher(user),
              );
    }

    async update(id: string, user: Partial<UserEntity>): Promise<void> {
        user.password = await this.hashPassword(user.password);
        if (user.role === Role.STUDENT_ROLE) {
            await this.studentsService.update(id, user);
        } else {
            this.teachersService.update(id, user);
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return this.studentsService.getByEmail(email).catch((err) => {
            if (err instanceof EntityNotFoundError)
                return this.teachersService.getByEmail(email);
        });
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }
}
