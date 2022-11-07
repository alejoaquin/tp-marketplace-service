import { Injectable } from '@nestjs/common';
import { CommentDto, CourseEntity, PublicCourseDto } from 'src/domain';
import { CommentsFactoryService } from '../comments/comments.factory.service';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class CoursesFactoryService {
    constructor(
        private usersFactoryService: UsersFactoryService,
        private commentsFactoryService: CommentsFactoryService,
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
        dto.teacher = this.usersFactoryService.userToBasicDto(
            await entity.teacher,
        );
        dto.comments = await this.getComments(entity);
        dto.imgSrc = entity.imgSrc;
        return dto;
    }

    private async getComments(entity: CourseEntity): Promise<CommentDto[]> {
        return Promise.all(
            entity.comments.map((c) => this.commentsFactoryService.toDto(c)),
        );
    }
}
