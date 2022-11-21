import { Injectable } from '@nestjs/common';
import {
    NotificationDto,
    NotificationEntity,
    UserBasicInfoDto,
} from 'src/domain';

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
        dto.courseId = entity.courseId;
        const user = new UserBasicInfoDto();
        user.id = entity.senderId;
        dto.senderUser = user;
        return dto;
    }
}
