import { Column, OneToMany } from 'typeorm';
import { NotificationEntity } from './notification.entity';

export abstract class UserEntity {
    constructor(
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
        notifications: NotificationEntity[],
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
        this.notifications = notifications;
    }

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    phone: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(() => NotificationEntity, (notification) => notification.user)
    notifications: NotificationEntity[];
}
