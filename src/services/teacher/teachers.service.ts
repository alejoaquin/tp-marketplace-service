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

    getAll(): Promise<TeacherEntity[]> {
        return this.teachersRepository.find();
    }

    async getById(id: string): Promise<TeacherEntity> {
        try {
            const teacher = await this.teachersRepository.findOneByOrFail({
                id: id,
            });
            return teacher;
        } catch (err) {
            //handle error
            throw err;
        }
    }

    create(teacher: TeacherDto): Promise<TeacherEntity> {
        try {
            const newTeacher = this.teachersRepository.create(
                this.teachersFactoryService.createNewTeacher(teacher),
            );
            return this.teachersRepository.save(newTeacher);
        } catch (err) {
            //handle error
            throw err;
        }
    }

    update(id: string, teacher: TeacherDto): Promise<TeacherEntity> {
        const teacherUpdated =
            this.teachersFactoryService.createNewTeacher(teacher);
        teacherUpdated.id = id;
        return this.teachersRepository.save(teacherUpdated);
    }

    async delete(id: string): Promise<TeacherEntity> {
        const teacher = await this.getById(id);
        return this.teachersRepository.remove(teacher);
    }
}
