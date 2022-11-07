import { BadRequestException, Injectable } from '@nestjs/common';
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
        console.log(c);
        return await this.commentsFactoryService.toDto(c);
    }

    async update(
        courseId: string,
        commentId: string,
        commentRequest: CommentRequest,
    ): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOneByOrFail({
            id: commentId,
        });
        const course = await comment.course;
        if (course.id != courseId) {
            throw new BadRequestException(); // TODO: check error message
        }
        comment.status = commentRequest.status;

        if (commentRequest.status === CommentStatus.BLOCKED)
            comment.blockReason = commentRequest.description;
        else comment.description = commentRequest.description;

        return this.commentRepository.save(comment);
    }
}
