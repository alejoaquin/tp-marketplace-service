import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentsRepository: Repository<StudentEntity>,
    ) {}

    async getAll(): Promise<StudentEntity[]> {
        return await this.studentsRepository.find();
    }

    getById(id: string): Promise<StudentEntity> {
        return this.studentsRepository.findOneBy({ id: id });
    }

    create(student: StudentEntity): Promise<StudentEntity> {
        try {
            return this.studentsRepository.save(student);
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    update(id: string, student: StudentEntity): Promise<StudentEntity> {
        console.log(student);
        student.id = id;
        return this.studentsRepository.save(student);
    }

    async delete(id: string): Promise<StudentEntity> {
        const student = await this.studentsRepository.findOneBy({ id: id });
        return student ? this.studentsRepository.remove(student) : null; //TODO: check this
    }
}
