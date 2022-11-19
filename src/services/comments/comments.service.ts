import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity, CommentStatus } from 'src/domain';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        private notificationsService: NotificationsService,
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
        const comment = await this.commentRepository.findOne({
            relations: {
                course: true,
            },
            where: {
                id: id,
                course: { id: courseId },
            },
        });

        comment.status = commentRequest.status;
        comment.description = commentRequest.description;

        if (commentRequest.status === CommentStatus.BLOCKED) {
            comment.blockReason = commentRequest.description;
            await this.notificationsService.sentBlockNotification(comment);
        }

        await this.commentRepository.save(comment);
    }
}
