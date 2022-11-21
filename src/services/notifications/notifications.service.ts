import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    InscriptionEntity,
    NotificationEntity,
    NotificationSource,
} from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(NotificationEntity)
        private notificationsRepository: Repository<NotificationEntity>,
        @InjectRepository(CommentEntity)
        private commentsRepository: Repository<CommentEntity>,
        @InjectRepository(InscriptionEntity)
        private inscriptionsRepository: Repository<InscriptionEntity>,
    ) {}

    async sentBlockNotification(
        comment: CommentEntity,
    ): Promise<NotificationEntity> {
        const course = await comment.course;
        const notification = this.notificationsRepository.create({
            description: comment.blockReason,
            userId: (await comment.student).id,
            senderId: (await course.teacher).id,
            objectId: comment.id,
            source: NotificationSource.BLOCK,
            courseId: course.id,
        });

        return this.notificationsRepository.save(notification);
    }

    async sentNewCommentNotification(
        comment: CommentEntity,
    ): Promise<NotificationEntity> {
        const teacher = await comment.course.then((c) => c.teacher);
        const notification = this.notificationsRepository.create({
            description: comment.description,
            userId: teacher.id,
            objectId: comment.id,
            source: NotificationSource.COMMENT,
            courseId: (await comment.course).id,
            senderId: (await comment.student).id,
        });

        return this.notificationsRepository.save(notification);
    }

    async sentInscriptionNotification(
        inscription: InscriptionEntity,
    ): Promise<NotificationEntity> {
        const teacher = await inscription.course.then((c) => c.teacher);
        const notification = this.notificationsRepository.create({
            description: inscription.reason,
            userId: teacher.id,
            objectId: inscription.id,
            source: NotificationSource.INSCRIPTION,
            courseId: (await inscription.course).id,
            senderId: (await inscription.student).id,
        });

        return this.notificationsRepository.save(notification);
    }

    getAll(userId: string): Promise<NotificationEntity[]> {
        return this.notificationsRepository.findBy({ userId: userId });
    }

    async read(id: string): Promise<NotificationEntity> {
        await this.notificationsRepository.update({ id: id }, { seen: true });
        return this.notificationsRepository.findOneBy({ id: id });
    }

    private getComment(commentId: string): Promise<CommentEntity> {
        return this.commentsRepository.findOneByOrFail({
            id: commentId,
        });
    }

    private getInscription(inscriptionId: string): Promise<InscriptionEntity> {
        return this.inscriptionsRepository.findOneByOrFail({
            id: inscriptionId,
        });
    }
}
