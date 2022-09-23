import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    source: string;

    @Column()
    sourceType: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    user: UserEntity;
}
