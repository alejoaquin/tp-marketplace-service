import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CourseEntity,
    CourseSearchRequest,
    InscriptionEntity,
    RatingEntity,
    TeacherEntity,
} from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(CourseEntity)
        private coursesRepository: Repository<CourseEntity>,
        @InjectRepository(TeacherEntity)
        private teacherRepository: Repository<TeacherEntity>,
    ) {}

    getAll(): Promise<CourseEntity[]> {
        return this.coursesRepository.find();
    }

    getPublished(): Promise<CourseEntity[]> {
        return this.coursesRepository.findBy({ published: true });
    }

    search(searchRequest: CourseSearchRequest): Promise<CourseEntity[]> {
        return this.coursesRepository.findBy({
            name: searchRequest.name,
            subject: searchRequest.subject,
            frequency: searchRequest.frequency,
            rating: searchRequest.rating,
            type: searchRequest.type,
            published: true,
        });
    }

    getById(id: string): Promise<CourseEntity> {
        return this.coursesRepository.findOneByOrFail({ id: id });
    }

    getByTeacher(teacherId: string): Promise<CourseEntity[]> {
        return this.coursesRepository.findBy({
            teacher: { id: teacherId },
        });
    }

    getByStudent(studentId: string): Promise<CourseEntity[]> {
        return this.coursesRepository.find({
            relations: {
                comments: true,
                ratings: true,
                inscriptions: true,
            },
            where: {
                inscriptions: {
                    student: { id: studentId },
                },
            },
        });
    }

    async create(curse: CourseEntity): Promise<CourseEntity> {
        const teacher = await curse.teacher;
        teacher.courses.push(curse);

        await this.teacherRepository.save(teacher);
        return curse;
    }

    async update(entity: CourseEntity): Promise<void> {
        await this.coursesRepository.save(entity);
    }

    async delete(id: string): Promise<void> {
        await this.coursesRepository.delete({ id: id });
    }

    async enroll(
        id: string,
        inscription: InscriptionEntity,
    ): Promise<InscriptionEntity> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        if (!course.published) {
            throw new BadRequestException(
                'No se puede inscribir a un curso no publicado',
            );
        }
        course.inscriptions.push(inscription);
        await this.coursesRepository.save(course);

        return inscription;
    }

    async addComment(
        id: string,
        comment: CommentEntity,
    ): Promise<CommentEntity> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        course.comments.push(comment);
        await this.coursesRepository.save(course);
        return comment;
    }

    async addRating(id: string, rating: RatingEntity): Promise<RatingEntity> {
        const course = await this.coursesRepository.findOneByOrFail({ id: id });
        course.ratings.push(rating);
        course.rating =
            course.ratings
                .map((r) => r.score)
                .reduce((partialSum, a) => partialSum + a, 0) /
            course.ratings.length;
        await this.coursesRepository.save(course);
        return rating;
    }
}
