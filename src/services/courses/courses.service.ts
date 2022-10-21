import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity, InscriptionEntity } from 'src/domain';
import { EnrollRequest } from 'src/domain/dtos/enroll.request';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        private studentServices: StudentsService,
    ) {}

    async getAll(): Promise<CourseEntity[]> {
        return this.coursesRepository.find();
    }

    getById(id: string): Promise<CourseEntity> {
        return this.coursesRepository.findOneBy({ id: id });
    }

    create(course: CourseEntity): Promise<CourseEntity> {
        try {
            const newCourse = this.coursesRepository.create(course);
            return this.coursesRepository.save(newCourse);
        } catch (err) {
            //TODO: handle error
            throw err;
        }
    }

    update(id: string, course: CourseEntity): Promise<CourseEntity> {
        course.id = id;
        return this.coursesRepository.save(course);
    }

    async delete(id: string): Promise<CourseEntity> {
        const course = await this.getById(id);
        return course ? this.coursesRepository.remove(course) : null; //TODO: check this
    }

    async enroll(
        id: string,
        enrollRequest: EnrollRequest,
    ): Promise<CourseEntity> {
        //TODO: fail if course and student don't exist
        const course = await this.getById(id);
        const student = await this.studentServices.getById(
            enrollRequest.studentId,
        );

        const inscription = new InscriptionEntity();
        inscription.phone = enrollRequest.phone;
        inscription.email = enrollRequest.email;
        inscription.reason = enrollRequest.reason;
        inscription.timeRangeFrom = enrollRequest.timeRangeFrom;
        inscription.timeRangeTo = enrollRequest.timeRangeTo;
        inscription.student = student;

        course.inscriptions.push(inscription);
        return this.coursesRepository.save(course);
    }

    async getInscriptions(id: string): Promise<InscriptionEntity[]> {
        const course = await this.getById(id);
        return course.inscriptions;
    }
}
