import { NotificationSource } from '../enums';

export class NotificationDto {
    id: string;
    description: string;
    objectId: string;
    seen: boolean;
    source: NotificationSource;
    courseId: string;
}
