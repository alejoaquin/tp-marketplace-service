import { NotificationSource } from '../enums';

export class NotificationRequest {
    description: string;
    objectId: string;
    source: NotificationSource;
}
