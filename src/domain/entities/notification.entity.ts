import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class NotificationEntity extends BaseEntity {
    @Column()
    source: string;

    @Column()
    sourceType: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    user: UserEntity;
}
