import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { Notification } from './Notification'

@Entity()
export abstract class User extends BaseEntity {
    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    phone: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[]
}
