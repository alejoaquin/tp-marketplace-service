import { Injectable } from '@nestjs/common';
import { NotificationDto, NotificationEntity } from 'src/domain';

@Injectable()
export class NotificationsFactoryService {
    constructor() {}

    async toDto(entity: NotificationEntity): Promise<NotificationDto> {
        const dto = new NotificationDto();
        dto.id = entity.id;
        dto.description = entity.description;
        dto.objectId = entity.objectId;
        dto.seen = entity.seen;
        dto.source = entity.source;
        return dto;
    }
}
