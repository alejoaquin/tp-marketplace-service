import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.abstract.entity';

@Entity()
export class Notification extends BaseEntity {
    @Column()
    source: string;

    @Column()
    sourceType: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.notifications)
    user: User;
}
