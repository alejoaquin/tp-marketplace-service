import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherDto } from 'src/domain/dtos/teacher.dto';
import { TeacherEntity } from 'src/domain/entities/teacher.entity';
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

    getById(id: string): Promise<TeacherEntity> {
        try {
            return this.toDto(
                this.teachersRepository.findOneByOrFail({
                    id: id,
                }),
            );
        } catch (err) {
            //handle error
            throw err;
        }
    }

    create(teacher: TeacherDto): Promise<TeacherEntity> {
        try {
            const newTeacher = this.teachersRepository.create(
                this.teachersFactoryService.toEntity(teacher),
            );
            return this.toDto(this.teachersRepository.save(newTeacher));
        } catch (err) {
            //handle error
            throw err;
        }
    }

    update(id: string, teacher: TeacherDto): Promise<TeacherEntity> {
        const teacherUpdated = this.teachersFactoryService.toEntity(teacher);
        teacherUpdated.id = id;
        return this.toDto(this.teachersRepository.save(teacherUpdated));
    }

    async delete(id: string): Promise<TeacherEntity> {
        const teacher = await this.getById(id);
        return this.toDto(this.teachersRepository.remove(teacher));
    }

    async toDto(entity: Promise<TeacherEntity>): Promise<TeacherDto> {
        const value = await entity;
        return this.teachersFactoryService.toDto(value);
    }
}
