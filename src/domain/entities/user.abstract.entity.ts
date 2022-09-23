import { Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NotificationEntity } from './notification.entity';

export abstract class UserEntity extends BaseEntity {
    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
        notifications: NotificationEntity[],
    ) {
        super(id);
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
