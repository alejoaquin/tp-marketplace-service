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

    create(student: TeacherDto): Promise<TeacherEntity> {
        try {
            const newTeacher = this.teachersRepository.create(
                this.teachersFactoryService.createNewTeacher(student),
            );
            return this.teachersRepository.save(newTeacher);
        } catch (err) {
            //handle error
            throw err;
        }
    }

    update(id: string, student: TeacherDto): Promise<TeacherEntity> {
        const studentUpdated =
            this.teachersFactoryService.createNewTeacher(student);
        studentUpdated.id = id;
        return this.teachersRepository.save(studentUpdated);
    }

    async delete(id: string): Promise<TeacherEntity> {
        const student = await this.getById(id);
        return this.teachersRepository.remove(student);
    }
}
