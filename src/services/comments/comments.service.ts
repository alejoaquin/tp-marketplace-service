import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity, CommentStatus } from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
    ) {}

    get(id: string): Promise<CommentEntity> {
        return this.commentRepository.findOneByOrFail({ id: id });
    }

    getByCourse(courseId: string): Promise<CommentEntity[]> {
        return this.commentRepository.findBy({
            course: { id: courseId },
        });
    }

    getByIdAndCourse(id: string, courseId: string): Promise<CommentEntity> {
        return this.commentRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
    }

    async update(
        id: string,
        courseId: string,
        commentRequest: CommentEntity,
    ): Promise<void> {
        const comment = await this.commentRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
        // TODO: send notification if the comment is block
        comment.status = commentRequest.status;

        if (commentRequest.status === CommentStatus.BLOCKED)
            comment.blockReason = commentRequest.description;
        else comment.description = commentRequest.description;

        await this.commentRepository.save(comment);
    }
}
