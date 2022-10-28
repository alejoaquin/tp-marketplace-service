import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationSource, NotificationState } from '../enums';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    userId: string;

    @Column()
    objectId: string;

    @Column({
        type: 'enum',
        enum: NotificationState,
        default: NotificationState.NEW,
    })
    status: NotificationState;

    @Column({
        type: 'enum',
        enum: NotificationSource,
    })
    source: NotificationSource;
}
