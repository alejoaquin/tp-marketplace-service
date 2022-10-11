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
        const entities = await this.teachersRepository.find();
        return entities.map((entity) =>
            this.teachersFactoryService.toDto(entity),
        );
    }

    getById(id: string): Promise<TeacherDto> {
        return this.toDto(this.teachersRepository.findOneBy({ id: id }));
    }

    create(teacher: TeacherDto): Promise<TeacherDto> {
        try {
            const newTeacher = this.teachersRepository.create(
                this.teachersFactoryService.toEntity(teacher),
            );
            return this.toDto(this.teachersRepository.save(newTeacher));
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    update(id: string, teacher: TeacherDto): Promise<TeacherDto> {
        const teacherUpdated = this.teachersFactoryService.toEntity(teacher);
        teacherUpdated.id = id;
        return this.toDto(this.teachersRepository.save(teacherUpdated));
    }

    async delete(id: string): Promise<TeacherDto> {
        const teacher = await this.getById(id);
        return teacher
            ? this.toDto(this.teachersRepository.remove(teacher))
            : null; //TODO: check this
    }

    async toDto(entity: Promise<TeacherEntity>): Promise<TeacherDto> {
        const value = await entity;
        return value ? this.teachersFactoryService.toDto(value) : null;
    }
}
