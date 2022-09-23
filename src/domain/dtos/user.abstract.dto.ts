import { NotificationDto } from './notification.dto';

export abstract class UserDto {
    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
        notifications: NotificationDto[],
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
        this.notifications = notifications;
    }

    id: string;

    firstname: string;

    lastname: string;

    phone: number;

    email: string;

    password: string;

    role: string;

    notifications: NotificationDto[];
}
