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
            const inscription = await this.getInscription(request.objectId);
            if (inscription.course.teacher.id !== userId) {
                throw new BadRequestException(); // TODO: check error message
            }
        } else {
            const comment = await this.getComment(request.objectId);
            if (
                request.source === NotificationSource.BLOCK &&
                comment.student.id !== userId
            ) {
                throw new BadRequestException(); // TODO: check error message
            } else if (
                request.source === NotificationSource.COMMENT &&
                comment.course.teacher.id !== userId
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
