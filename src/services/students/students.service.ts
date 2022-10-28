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
        return this.studentsRepository.findOneByOrFail({ id: id });
    }

    create(student: StudentEntity): Promise<StudentEntity> {
        return this.studentsRepository.save(student);
    }

    async update(
        id: string,
        updateRequest: StudentEntity,
    ): Promise<StudentEntity> {
        const student = await this.getById(id);
        student.email;
        student.firstname = updateRequest.firstname;
        student.lastname = updateRequest.lastname;
        student.phone = updateRequest.phone;
        student.birthday = updateRequest.birthday;
        student.educationalDegrees = updateRequest.educationalDegrees;
        return this.studentsRepository.save(student);
    }

    async delete(id: string): Promise<StudentEntity> {
        const student = await this.getById(id);
        return this.studentsRepository.remove(student);
    }
}
