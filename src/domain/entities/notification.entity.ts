import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationSource } from '../enums';

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

    @Column()
    courseId: string;

    @Column({ default: false })
    seen: boolean;

    @Column({
        type: 'enum',
        enum: NotificationSource,
    })
    source: NotificationSource;
}
