import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CommentEntity,
    InscriptionEntity,
    NotificationEntity,
    NotificationRequest,
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

    async create(
        userId: string,
        request: NotificationRequest,
    ): Promise<NotificationEntity> {
        if (request.source === NotificationSource.INSCRIPTION) {
            const teacher = await this.getInscription(request.objectId)
                .then((i) => i.course)
                .then((c) => c.teacher);
            if (teacher.id !== userId) {
                throw new BadRequestException(); // TODO: check error message
            }
        } else {
            const comment = await this.getComment(request.objectId);
            const teacher = await comment.course.then((c) => c.teacher);
            if (
                request.source === NotificationSource.BLOCK &&
                (await comment.student).id !== userId
            ) {
                throw new BadRequestException(); // TODO: check error message
            } else if (
                request.source === NotificationSource.COMMENT &&
                teacher.id !== userId
            ) {
                throw new BadRequestException(); // TODO: check error message
            }
        }

        const notification = this.notificationsRepository.create({
            description: request.description,
            userId: userId,
            objectId: request.objectId,
            source: request.source,
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
