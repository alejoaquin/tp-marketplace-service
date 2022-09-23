import { Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NotificationEntity } from './notification.entity';

export abstract class UserEntity extends BaseEntity {
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
