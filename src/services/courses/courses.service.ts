import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentRequest,
    CourseEntity,
    CourseSearchRequest,
    CreateCourseRequest,
    EnrollRequest,
    PublicCourseDto,
} from 'src/domain';
import { CompleteCourseDto } from 'src/domain/dtos/complete.course.dto';
import { Repository } from 'typeorm';
import { CommentsService } from '../comments/comments.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { StudentsService } from '../students/students.service';
import { CoursesFactoryService } from './courses.factory.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        private studentService: StudentsService,
        private commentsService: CommentsService,
        private inscriptionsService: InscriptionsService,
        private coursesFactoryService: CoursesFactoryService,
    ) {}

    async getAll(): Promise<CompleteCourseDto[]> {
        // TODO: check if we need this getAll without filtering by published
        const arr = await this.coursesRepository.find();
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toCompleteDto(ac)),
        );
    }

    async getPublished(): Promise<PublicCourseDto[]> {
        const arr = await this.coursesRepository.findBy({ published: true });
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toPublicDto(ac)),
        );
    }

    async search(
        searchRequest: CourseSearchRequest,
    ): Promise<PublicCourseDto[]> {
        const arr = await this.coursesRepository.findBy({
            name: searchRequest.name,
            subject: searchRequest.subject,
            frequency: searchRequest.frequency,
            rating: searchRequest.rating,
            type: searchRequest.type,
            published: true,
        });
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toPublicDto(ac)),
        );
    }

    async getById(id: string): Promise<CompleteCourseDto> {
        const entity = await this.coursesRepository.findOneByOrFail({ id: id });
        return this.coursesFactoryService.toCompleteDto(entity);
    }

    async create(course: CreateCourseRequest): Promise<CompleteCourseDto> {
        const entity = await this.coursesRepository.save(course); // TODO: fix this
        return this.coursesFactoryService.toCompleteDto(entity);
    }

    async update(
        id: string,
        updateRequest: CourseEntity,
    ): Promise<CompleteCourseDto> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        course.name = updateRequest.name;
        course.subject = updateRequest.subject;
        course.duration = updateRequest.duration;
        course.frequency = updateRequest.frequency;
        course.price = updateRequest.price;
        course.description = updateRequest.description;
        course.type = updateRequest.type;
        course.imgSrc = updateRequest.imgSrc;
        const entity = await this.coursesRepository.save(course);
        return this.coursesFactoryService.toCompleteDto(entity);
    }

    async delete(id: string): Promise<CompleteCourseDto> {
        const response = await this.coursesRepository.delete({ id: id });
        return this.coursesFactoryService.toCompleteDto(response.raw);
    }

    async enroll(
        id: string,
        enrollRequest: EnrollRequest,
    ): Promise<PublicCourseDto> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        const student = await this.studentService.getById(
            enrollRequest.studentId,
        );
        const inscription = this.inscriptionsService.create(
            enrollRequest,
            student,
        );

        course.inscriptions.push(inscription);
        const entity = await this.coursesRepository.save(course);
        return this.coursesFactoryService.toPublicDto(entity);
    }

    async addComment(
        id: string,
        commentRequest: CommentRequest,
    ): Promise<CourseEntity> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        const comment = this.commentsService.create(
            commentRequest,
            this.studentService.getById(commentRequest.studentId),
        );
        course.comments.push(comment);
        return this.coursesRepository.save(course);
    }
}
