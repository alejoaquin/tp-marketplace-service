import { Injectable } from '@nestjs/common';
import {
    CommentDto,
    CommentStatus,
    CourseEntity,
    CreateCourseRequest,
    InscriptionDto,
    PublicCourseDto,
} from 'src/domain';
import { CompleteCourseDto } from 'src/domain/dtos/complete.course.dto';
import { CommentsFactoryService } from '../comments/comments.factory.service';
import { InscriptionsFactoryService } from '../inscriptions/inscriptions.factory.service';
import { TeachersFactoryService } from '../teacher/teachers-factory.service';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class CoursesFactoryService {
    constructor(
        private usersFactoryService: UsersFactoryService,
        private commentsFactoryService: CommentsFactoryService,
        private inscriptionsFactoryService: InscriptionsFactoryService,
        private teachersFactoryService: TeachersFactoryService,
    ) {}

    async toPublicDto(entity: CourseEntity): Promise<PublicCourseDto> {
        const dto = new PublicCourseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.subject = entity.subject;
        dto.duration = entity.duration;
        dto.frequency = entity.frequency;
        dto.price = entity.price;
        dto.description = entity.description;
        dto.rating = entity.rating;
        dto.type = entity.type;
        dto.teacher = this.teachersFactoryService.toBasicDto(
            await entity.teacher,
        );
        dto.comments = await this.getComments(entity);
        dto.imgSrc = entity.imgSrc;
        return dto;
    }

    async toCompleteDto(entity: CourseEntity): Promise<CompleteCourseDto> {
        const dto = new CompleteCourseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.subject = entity.subject;
        dto.duration = entity.duration;
        dto.frequency = entity.frequency;
        dto.price = entity.price;
        dto.description = entity.description;
        dto.rating = entity.rating;
        dto.type = entity.type;
        dto.teacher = this.usersFactoryService.userToBasicDto(
            await entity.teacher,
        );
        dto.comments = await this.getComments(entity);
        dto.imgSrc = entity.imgSrc;
        dto.published = entity.published;
        dto.inscriptions = await this.getInscriptions(entity);
        return dto;
    }

    requestToEntity(request: CreateCourseRequest): CourseEntity {
        const entity = new CourseEntity();
        entity.name = request.name;
        entity.subject = request.subject;
        entity.duration = request.duration;
        entity.frequency = request.frequency;
        entity.price = request.price;
        entity.description = request.description;
        entity.type = request.type;
        entity.imgSrc = request.imgSrc;
        return entity;
    }

    private async getComments(entity: CourseEntity): Promise<CommentDto[]> {
        return Promise.all(
            entity.comments
                .filter((c) => c.status && c.status === CommentStatus.ACCEPTED)
                .map((c) => this.commentsFactoryService.toDto(c)),
        );
    }

    private async getInscriptions(
        entity: CourseEntity,
    ): Promise<InscriptionDto[]> {
        return Promise.all(
            entity.inscriptions.map((c) =>
                this.inscriptionsFactoryService.toDto(c),
            ),
        );
    }
}
