import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentDto,
    CommentEntity,
    CommentRequest,
    CommentStatus,
    StudentEntity,
} from 'src/domain';
import { Repository } from 'typeorm';
import { CommentsFactoryService } from './comments.factory.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        private commentsFactoryService: CommentsFactoryService,
    ) {}

    create(
        commentRequest: CommentRequest,
        student: Promise<StudentEntity>,
    ): CommentEntity {
        const comment = new CommentEntity();
        comment.description = commentRequest.description;
        comment.student = student;
        return comment;
    }

    async get(id: string): Promise<CommentDto> {
        const c = await this.commentRepository.findOneByOrFail({ id: id });
        return await this.commentsFactoryService.toDto(c);
    }

    async getByCourse(courseId: string): Promise<CommentDto[]> {
        const entities = await this.commentRepository.findBy({
            course: { id: courseId },
        });
        return Promise.all(
            entities.map((entity) => this.commentsFactoryService.toDto(entity)),
        );
    }

    async getByIdAndCourse(id: string, courseId: string): Promise<CommentDto> {
        const entity = await this.commentRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
        return this.commentsFactoryService.toDto(entity);
    }

    async update(
        id: string,
        courseId: string,
        commentRequest: CommentRequest,
    ): Promise<CommentDto> {
        const comment = await this.commentRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
        // TODO: send notification if the comment is block
        comment.status = commentRequest.status;

        if (commentRequest.status === CommentStatus.BLOCKED)
            comment.blockReason = commentRequest.description;
        else comment.description = commentRequest.description;

        const entity = await this.commentRepository.save(comment);
        return this.commentsFactoryService.toDto(entity);
    }
}
