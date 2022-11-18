import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentDto,
    CommentRequest,
    CourseDto,
    CourseEntity,
    CourseRequest,
    CourseSearchRequest,
    EnrollRequest,
    InscriptionDto,
    TeacherEntity,
} from 'src/domain';
import { Repository } from 'typeorm';
import { CommentsFactoryService } from '../comments/comments.factory.service';
import { CommentsService } from '../comments/comments.service';
import { InscriptionsFactoryService } from '../inscriptions/inscriptions.factory.service';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { StudentsService } from '../students/students.service';
import { CoursesFactoryService } from './courses.factory.service';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        @InjectRepository(TeacherEntity)
        private teacherRepository: Repository<TeacherEntity>,
        private studentService: StudentsService,
        private commentsService: CommentsService,
        private commentsFactoryService: CommentsFactoryService,
        private inscriptionsService: InscriptionsService,
        private inscriptionsFactoryService: InscriptionsFactoryService,
        private coursesFactoryService: CoursesFactoryService,
    ) {}

    async getAll(): Promise<CourseDto[]> {
        // TODO: check if we need this getAll without filtering by published
        const arr = await this.coursesRepository.find();
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, false)),
        );
    }

    async getPublished(): Promise<CourseDto[]> {
        const arr = await this.coursesRepository.findBy({ published: true });
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, true)),
        );
    }

    async search(searchRequest: CourseSearchRequest): Promise<CourseDto[]> {
        const arr = await this.coursesRepository.findBy({
            name: searchRequest.name,
            subject: searchRequest.subject,
            frequency: searchRequest.frequency,
            rating: searchRequest.rating,
            type: searchRequest.type,
            published: true,
        });
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, true)),
        );
    }

    async getById(id: string): Promise<CourseDto> {
        const entity = await this.coursesRepository.findOneByOrFail({ id: id });
        return this.coursesFactoryService.toDto(entity, false);
    }

    async getByTeacher(id: string): Promise<CourseDto[]> {
        const arr = await this.coursesRepository.findBy({
            teacher: { id: id },
        });
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, false)),
        );
    }

    async create(request: CourseRequest): Promise<CourseDto> {
        const teacher = await this.teacherRepository.findOneByOrFail({
            id: request.teacherId,
        });
        const curse = this.coursesFactoryService.requestToEntity(request);
        teacher.courses.push(curse);

        await this.teacherRepository.save(teacher);
        return this.coursesFactoryService.toDto(curse, false);
    }

    async update(id: string, updateRequest: CourseRequest): Promise<void> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        course.name = updateRequest.name;
        course.subject = updateRequest.subject;
        course.duration = updateRequest.duration;
        course.frequency = updateRequest.frequency;
        course.price = updateRequest.price;
        course.description = updateRequest.description;
        course.type = updateRequest.type;
        course.imgSrc = updateRequest.imgSrc;
        await this.coursesRepository.save(course);
    }

    async delete(id: string): Promise<void> {
        await this.coursesRepository.delete({ id: id });
    }

    async enroll(
        id: string,
        enrollRequest: EnrollRequest,
    ): Promise<InscriptionDto> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        if (!course.published) {
            throw new BadRequestException(
                'No se puede inscribir a un curso no publicado',
            );
        }
        const student = await this.studentService.getById(
            enrollRequest.studentId,
        );
        const inscription = this.inscriptionsService.create(
            enrollRequest,
            student,
        );
        course.inscriptions.push(inscription);
        const entity = await this.coursesRepository.save(course);
        await this.coursesFactoryService.toDto(entity, true);
        return this.inscriptionsFactoryService.toDto(inscription);
    }

    async addComment(
        id: string,
        commentRequest: CommentRequest,
    ): Promise<CommentDto> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        const comment = this.commentsService.create(
            commentRequest,
            this.studentService.getById(commentRequest.studentId),
        );
        course.comments.push(comment);
        await this.coursesRepository.save(course);
        return this.commentsFactoryService.toDto(comment);
    }
}
