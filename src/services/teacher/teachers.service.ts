import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherDto, TeacherEntity } from 'src/domain';
import { Repository } from 'typeorm';
import { TeachersFactoryService } from './teachers-factory.service';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(TeacherEntity)
        private teachersRepository: Repository<TeacherEntity>,
        private teachersFactoryService: TeachersFactoryService,
    ) {}

    async getAll(): Promise<TeacherDto[]> {
        const arr = await this.teachersRepository.find();
        return Promise.all(
            arr.map((t) => this.teachersFactoryService.toDto(t)),
        );
    }

    async getById(id: string): Promise<TeacherDto> {
        const entity = await this.teachersRepository.findOneBy({ id: id });
        return this.teachersFactoryService.toDto(entity);
    }

    getByEmail(email: string): Promise<TeacherEntity> {
        return this.teachersRepository.findOneBy({ email: email });
    }

    async create(teacher: TeacherEntity): Promise<TeacherDto> {
        const newTeacher = await this.teachersRepository.save(teacher);
        return this.teachersFactoryService.toDto(newTeacher);
    }

    async update(id: string, teacher: TeacherDto): Promise<void> {
        const entity = await this.teachersRepository.findOneBy({ id: id });
        entity.firstname = teacher.name;
        entity.lastname = teacher.lastname;
        entity.title = teacher.title;
        entity.experience = teacher.experience;
        entity.phone = teacher.phone;
        entity.email = teacher.email;

        await this.teachersRepository.save(teacher);
    }

    async delete(id: string): Promise<void> {
        await this.teachersRepository.delete({ id: id });
    }
}
