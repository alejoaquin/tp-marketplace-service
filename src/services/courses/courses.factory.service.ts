import { Injectable } from '@nestjs/common';
import {
    CommentDto,
    CommentStatus,
    CourseEntity,
    CourseRequest,
    InscriptionDto,
} from 'src/domain';
import { CourseDto } from 'src/domain/dtos/course.dto';
import { CommentsFactoryService } from '../comments/comments.factory.service';
import { InscriptionsFactoryService } from '../inscriptions/inscriptions.factory.service';
import { TeachersFactoryService } from '../teacher/teachers-factory.service';

@Injectable()
export class CoursesFactoryService {
    constructor(
        private commentsFactoryService: CommentsFactoryService,
        private inscriptionsFactoryService: InscriptionsFactoryService,
        private teachersFactoryService: TeachersFactoryService,
    ) {}

    async toDto(entity: CourseEntity, published: boolean): Promise<CourseDto> {
        const dto = new CourseDto();
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
        if (entity.comments !== undefined) {
            dto.comments = published
                ? await this.getPublicComments(entity)
                : await this.getComments(entity);
        }
        dto.imgSrc = entity.imgSrc;
        dto.published = entity.published;

        if (entity.inscriptions !== undefined) {
            dto.inscriptions = await this.getInscriptions(entity);
        }
        return dto;
    }

    requestToEntity(request: CourseRequest): CourseEntity {
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
            entity.comments.map((c) => this.commentsFactoryService.toDto(c)),
        );
    }

    private async getPublicComments(
        entity: CourseEntity,
    ): Promise<CommentDto[]> {
        return this.getComments(entity).then((c) =>
            c.filter((c) => c.status && c.status === CommentStatus.ACCEPTED),
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
