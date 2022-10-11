import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentDto, StudentEntity } from 'src/domain';
import { Repository } from 'typeorm';
import { StudentsFactoryService } from './students-factory.service';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentsRepository: Repository<StudentEntity>,
        private studentFactoryService: StudentsFactoryService,
    ) {}

    async getAll(): Promise<StudentDto[]> {
        const entities = await this.studentsRepository.find();
        return entities.map((entity) =>
            this.studentFactoryService.toDto(entity),
        );
    }

    getById(id: string): Promise<StudentDto> {
        return this.toDto(this.studentsRepository.findOneBy({ id: id }));
    }

    create(student: StudentDto): Promise<StudentDto> {
        try {
            const newStudent = this.studentsRepository.create(
                this.studentFactoryService.toEntity(student),
            );
            return this.toDto(this.studentsRepository.save(newStudent));
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    update(id: string, student: StudentDto): Promise<StudentDto> {
        const studentUpdated = this.studentFactoryService.toDto(student);
        studentUpdated.id = id;
        return this.toDto(this.studentsRepository.save(studentUpdated));
    }

    async delete(id: string): Promise<StudentDto> {
        const student = await this.getById(id);
        return student
            ? this.toDto(this.studentsRepository.remove(student).then())
            : null; //TODO: check this
    }

    async toDto(entity: Promise<StudentEntity>): Promise<StudentDto> {
        const value = await entity;
        return value ? this.studentFactoryService.toDto(value) : null;
    }
}
