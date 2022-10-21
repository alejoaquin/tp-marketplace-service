import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity, InscriptionEntity } from 'src/domain';
import { EnrollRequest } from 'src/domain/dtos/enroll.request';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        @InjectRepository(CourseEntity)
        private inscriptionRepository: Repository<InscriptionEntity>,
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
        const course = await this.getById(id);
        const inscription = this.inscriptionRepository.create({
            phone: enrollRequest.phone,
            email: enrollRequest.email,
            reason: enrollRequest.reason,
            timeRangeFrom: enrollRequest.timeRangeFrom,
            timeRangeTo: enrollRequest.timeRangeTo,
        });

        inscription.course = course;
        course.inscriptions.push(
            await this.inscriptionRepository.save(inscription),
        );

        return course;
    }

    async getInscriptions(id: string): Promise<InscriptionEntity[]> {
        const course = await this.getById(id);
        return course.inscriptions;
    }
}
