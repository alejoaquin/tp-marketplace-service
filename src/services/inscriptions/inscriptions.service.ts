import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    EnrollRequest,
    InscriptionDto,
    InscriptionEntity,
    StudentEntity,
    UpdateInscriptionRequest,
} from 'src/domain';
import { Repository } from 'typeorm';
import { InscriptionsFactoryService } from './inscriptions.factory.service';

@Injectable()
export class InscriptionsService {
    constructor(
        @InjectRepository(InscriptionEntity)
        private inscriptionRepository: Repository<InscriptionEntity>,
        private inscriptionsFactoryService: InscriptionsFactoryService,
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
    ): Promise<InscriptionDto> {
        const inscription = await this.inscriptionRepository.findOne({
            relations: {
                course: true,
            },
            where: {
                id: id,
                course: { id: courseId },
            },
        });

        inscription.phone = updateRequest.phone;
        inscription.email = updateRequest.email;
        inscription.reason = updateRequest.reason;
        inscription.timeRangeFrom = updateRequest.timeRangeFrom;
        inscription.timeRangeTo = updateRequest.timeRangeTo;

        if (inscription.status != updateRequest.status) {
            inscription.status = updateRequest.status;
        }

        return this.save(inscription);
    }

    private async save(entity: InscriptionEntity): Promise<InscriptionDto> {
        const inscription = await this.inscriptionRepository.save(entity);
        return this.inscriptionsFactoryService.toDto(inscription);
    }
}
