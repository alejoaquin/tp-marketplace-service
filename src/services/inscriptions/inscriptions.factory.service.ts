import { Injectable } from '@nestjs/common';
import { EnrollRequest, InscriptionDto, InscriptionEntity } from 'src/domain';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class InscriptionsFactoryService {
    constructor(private usersFactoryService: UsersFactoryService) {}

    async toDto(entity: InscriptionEntity): Promise<InscriptionDto> {
        const dto = new InscriptionDto();
        dto.id = entity.id;
        dto.phone = entity.phone;
        dto.email = entity.email;
        dto.reason = entity.reason;
        dto.timeRangeFrom = entity.timeRangeFrom;
        dto.timeRangeTo = entity.timeRangeTo;
        dto.status = entity.status;
        dto.student = this.usersFactoryService.toBasicDto(await entity.student);
        return dto;
    }

    async enrollToEntity(enroll: EnrollRequest): Promise<InscriptionEntity> {
        const entity = new InscriptionEntity();
        entity.phone = enroll.phone;
        entity.email = enroll.email;
        entity.reason = enroll.reason;
        entity.timeRangeFrom = enroll.timeRangeFrom;
        entity.timeRangeTo = enroll.timeRangeTo;
        return entity;
    }
}
