import { NotificationSource } from 'src/domain/enums';

export class NotificationRequest {
    description: string;
    objectId: string;
    source: NotificationSource;
}
