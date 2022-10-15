import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherEntity } from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
    constructor(
        @InjectRepository(TeacherEntity)
        private teachersRepository: Repository<TeacherEntity>,
    ) {}

    async getAll(): Promise<TeacherEntity[]> {
        return await this.teachersRepository.find();
    }

    getById(id: string): Promise<TeacherEntity> {
        return this.teachersRepository.findOneBy({ id: id });
    }

    create(teacher: TeacherEntity): Promise<TeacherEntity> {
        try {
            const newTeacher = this.teachersRepository.create(teacher);
            return this.teachersRepository.save(newTeacher);
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    update(id: string, teacher: TeacherEntity): Promise<TeacherEntity> {
        teacher.id = id;
        return this.teachersRepository.save(teacher);
    }

    async delete(id: string): Promise<TeacherEntity> {
        const teacher = await this.getById(id);
        return teacher ? this.teachersRepository.remove(teacher) : null; //TODO: check this
    }
}
