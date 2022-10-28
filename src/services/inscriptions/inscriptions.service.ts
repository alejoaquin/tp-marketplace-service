import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    InscriptionEntity,
    StudentEntity,
    UpdateInscriptionRequest,
} from 'src/domain';
import { EnrollRequest } from 'src/domain/dtos/enroll.request';
import { Repository } from 'typeorm';

@Injectable()
export class InscriptionsService {
    constructor(
        @InjectRepository(InscriptionEntity)
        private inscriptionRepository: Repository<InscriptionEntity>,
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
        inscription.student = student;
        return inscription;
    }

    get(id: string): Promise<InscriptionEntity> {
        return this.inscriptionRepository.findOneByOrFail({ id: id });
    }

    async update(
        courseId: string,
        inscriptionId: string,
        updateRequest: UpdateInscriptionRequest,
    ): Promise<InscriptionEntity> {
        const inscription = await this.get(inscriptionId);
        const course = await inscription.course;
        if (course.id != courseId) {
            throw new BadRequestException(); // TODO: check error message
        }
        inscription.phone = updateRequest.phone;
        inscription.email = updateRequest.email;
        inscription.reason = updateRequest.reason;
        inscription.timeRangeFrom = updateRequest.timeRangeFrom;
        inscription.timeRangeTo = updateRequest.timeRangeTo;

        if (inscription.status != updateRequest.status) {
            // TODO: send notification
            inscription.status = updateRequest.status;
        }

        return this.inscriptionRepository.save(inscription);
    }
}
