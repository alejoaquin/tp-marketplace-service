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

    getAll(): Promise<TeacherEntity[]> {
        return this.teachersRepository.find();
    }

    getById(id: string): Promise<TeacherEntity> {
        return this.teachersRepository.findOneBy({ id: id });
    }

    getByEmail(email: string): Promise<TeacherEntity> {
        return this.teachersRepository.findOneBy({ email: email });
    }

    create(teacher: TeacherEntity): Promise<TeacherEntity> {
        return this.teachersRepository.save(teacher);
    }

    async updatePartial(
        id: string,
        partial: Partial<TeacherEntity>,
    ): Promise<void> {
        await this.teachersRepository.update(id, partial);
    }

    async delete(id: string): Promise<void> {
        await this.teachersRepository.delete({ id: id });
    }
}
