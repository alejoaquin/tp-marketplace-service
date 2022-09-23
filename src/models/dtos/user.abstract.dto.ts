import { NotificationDto } from './notification.dto';

export abstract class UserDto {
    id: string;

    firstname: string;

    lastname: string;

    phone: number;

    email: string;

    password: string;

    role: string;

    notifications: NotificationDto[];
}
