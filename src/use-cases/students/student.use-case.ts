import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from 'src/domain';
import { Repository } from 'typeorm';
import { StudentDto } from 'src/domain';
import { StudentFactoryService } from './student-factory.service';

@Injectable()
export class StudentUseCase {
    constructor(
        @InjectRepository(StudentEntity)
        private studentsRepository: Repository<StudentEntity>,
        private studentFactoryService: StudentFactoryService,
    ) {}

    getAll(): Promise<StudentEntity[]> {
        return this.studentsRepository.find();
    }

    async getStudentById(id: string): Promise<StudentEntity> {
        try {
            const student = await this.studentsRepository.findOneByOrFail({
                id: id,
            });
            return student;
        } catch (err) {
            //handle error
            throw err;
        }
    }

    create(student: StudentDto): Promise<StudentEntity> {
        try {
            const newStudent = this.studentsRepository.create(
                this.studentFactoryService.createNewStudent(student),
            );
            return this.studentsRepository.save(newStudent);
        } catch (err) {
            //handle error
            throw err;
        }
    }

    update(id: string, student: StudentDto): Promise<StudentEntity> {
        const studentUpdated =
            this.studentFactoryService.createNewStudent(student);
        studentUpdated.id = id;
        return this.studentsRepository.save(studentUpdated);
    }

    async delete(id: string): Promise<StudentEntity> {
        const student = await this.getStudentById(id);
        return this.studentsRepository.remove(student);
    }
}
