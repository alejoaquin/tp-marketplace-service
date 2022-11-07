import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CommentRequest,
    CourseEntity,
    CourseSearchRequest,
    EnrollRequest,
    InscriptionEntity,
} from 'src/domain';
import { Repository } from 'typeorm';
import { CommentsService } from '../comments/comments.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        private studentService: StudentsService,
        private commentsService: CommentsService,
        private inscriptionsService: InscriptionsService,
    ) {}

    getAll(): Promise<CourseEntity[]> {
        return this.coursesRepository.find();
    }

    async search(searchRequest: CourseSearchRequest): Promise<CourseEntity[]> {
        return this.coursesRepository.findBy({
            name: searchRequest.name,
            subject: searchRequest.subject,
            frequency: searchRequest.frequency,
            rating: searchRequest.rating,
            type: searchRequest.type,
        });
    }

    getById(id: string): Promise<CourseEntity> {
        return this.coursesRepository.findOneByOrFail({ id: id });
    }

    create(course: CourseEntity): Promise<CourseEntity> {
        return this.coursesRepository.save(course);
    }

    async update(
        id: string,
        updateRequest: CourseEntity,
    ): Promise<CourseEntity> {
        const course = await this.getById(id);
        course.name = updateRequest.name;
        course.subject = updateRequest.subject;
        course.duration = updateRequest.duration;
        course.frequency = updateRequest.frequency;
        course.price = updateRequest.price;
        course.description = updateRequest.description;
        course.type = updateRequest.type;
        course.imgSrc = updateRequest.imgSrc;
        return this.coursesRepository.save(course);
    }

    async delete(id: string): Promise<CourseEntity> {
        const course = await this.getById(id);
        return this.coursesRepository.remove(course);
    }

    async enroll(
        id: string,
        enrollRequest: EnrollRequest,
    ): Promise<CourseEntity> {
        const course = await this.getById(id);
        const student = await this.studentService.getById(
            enrollRequest.studentId,
        );
        const inscription = this.inscriptionsService.create(
            enrollRequest,
            student,
        );

        course.inscriptions.push(inscription);
        return this.coursesRepository.save(course);
    }

    async getInscriptions(id: string): Promise<InscriptionEntity[]> {
        const course = await this.getById(id);
        return course.inscriptions;
    }

    async getInscriptionById(
        id: string,
        inscriptionId: string,
    ): Promise<InscriptionEntity> {
        const inscriptions = await this.getInscriptions(id).then((arr) =>
            arr.filter((i) => i.id === inscriptionId),
        );
        if (inscriptions == null || inscriptions.length < 1)
            throw new NotFoundException();
        return inscriptions.pop();
    }

    async addComment(
        id: string,
        commentRequest: CommentRequest,
    ): Promise<CourseEntity> {
        const course = await this.getById(id);
        const comment = this.commentsService.create(
            commentRequest,
            this.studentService.getById(commentRequest.studentId),
        );
        course.comments.push(comment);
        return this.coursesRepository.save(course);
    }

    async getComments(id: string): Promise<CommentEntity[]> {
        const course = await this.getById(id);
        return course.comments;
    }
}
