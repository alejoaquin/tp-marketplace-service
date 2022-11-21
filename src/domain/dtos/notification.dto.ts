import { NotificationSource } from '../enums';
import { UserBasicInfoDto } from './user.basic.info.dto';

export class NotificationDto {
    id: string;
    description: string;
    objectId: string;
    seen: boolean;
    source: NotificationSource;
    courseId: string;
    senderUser: UserBasicInfoDto;
}
