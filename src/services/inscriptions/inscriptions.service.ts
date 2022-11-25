import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    EnrollRequest,
    InscriptionDto,
    InscriptionEntity,
    InscriptionStatus,
    StudentEntity,
    UpdateInscriptionRequest,
} from 'src/domain';
import { Repository } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import { InscriptionsFactoryService } from './inscriptions.factory.service';

@Injectable()
export class InscriptionsService {
    constructor(
        @InjectRepository(InscriptionEntity)
        private inscriptionRepository: Repository<InscriptionEntity>,
        private inscriptionsFactoryService: InscriptionsFactoryService,
        private notificationsService: NotificationsService,
    ) {}

    create(
        enrollRequest: EnrollRequest,
        student: StudentEntity,
    ): InscriptionEntity {
        const inscription = new InscriptionEntity();
        inscription.phone = enrollRequest.phone;
        inscription.email = enrollRequest.email;
        inscription.reason = enrollRequest.reason;
        inscription.timeRangeFrom = enrollRequest.timeRangeFrom;
        inscription.timeRangeTo = enrollRequest.timeRangeTo;
        inscription.student = Promise.resolve(student);
        return inscription;
    }

    async get(id: string): Promise<InscriptionDto> {
        const entity = await this.inscriptionRepository.findOneByOrFail({
            id: id,
        });
        return this.inscriptionsFactoryService.toDto(entity);
    }

    async getByCourse(courseId: string): Promise<InscriptionDto[]> {
        const entities = await this.inscriptionRepository.findBy({
            course: { id: courseId },
        });

        return Promise.all(
            entities.map((entity) =>
                this.inscriptionsFactoryService.toDto(entity),
            ),
        );
    }

    async getByIdAndCourse(
        id: string,
        courseId: string,
    ): Promise<InscriptionDto> {
        const entity = await this.inscriptionRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
        return this.inscriptionsFactoryService.toDto(entity);
    }

    async update(
        id: string,
        courseId: string,
        updateRequest: UpdateInscriptionRequest,
    ): Promise<void> {
        const inscription = await this.inscriptionRepository.findOne({
            relations: {
                course: true,
            },
            where: {
                id: id,
                course: { id: courseId },
            },
        });
        const newState = inscription.status != updateRequest.status;
        await this.inscriptionRepository.update(id, {
            phone: updateRequest.phone,
            email: updateRequest.email,
            reason: updateRequest.reason,
            timeRangeFrom: updateRequest.timeRangeFrom,
            timeRangeTo: updateRequest.timeRangeTo,
            status: updateRequest.status,
        });

        if (newState && updateRequest.status == InscriptionStatus.ACCEPTED) {
            await this.notificationsService.sentAcceptedInscriptionNotification(
                inscription,
            );
        }
    }
}
