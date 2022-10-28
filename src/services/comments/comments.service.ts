import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    CommentRequest,
    CommentStatus,
    StudentEntity,
} from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
    ) {}

    create(
        commentRequest: CommentRequest,
        student: StudentEntity,
    ): CommentEntity {
        const comment = new CommentEntity();
        comment.description = commentRequest.description;
        comment.student = student;

        return comment;
    }

    get(id: string): Promise<CommentEntity> {
        return this.commentRepository.findOneByOrFail({ id: id });
    }

    async update(
        courseId: string,
        commentId: string,
        commentRequest: CommentRequest,
    ): Promise<CommentEntity> {
        const comment = await this.get(commentId);
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
