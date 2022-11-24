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

    async update(id: string, teacher: TeacherEntity): Promise<void> {
        const entity = await this.teachersRepository.findOneBy({ id: id });
        entity.firstname = teacher.firstname;
        entity.lastname = teacher.lastname;
        entity.title = teacher.title;
        entity.experience = teacher.experience;
        entity.phone = teacher.phone;
        entity.email = teacher.email;

        await this.teachersRepository.save(teacher);
    }

    async updatePartial(
        id: string,
        partial: Partial<TeacherEntity>,
    ): Promise<void> {
        const result = await this.teachersRepository.update(id, partial);
        console.log('Updated result: ', result.affected);
    }

    async delete(id: string): Promise<void> {
        await this.teachersRepository.delete({ id: id });
    }
}
