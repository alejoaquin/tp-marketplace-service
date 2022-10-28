/*
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationSource, NotificationState } from '../enums';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class NotificationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    reason: string;

    @ManyToOne(() => UserEntity, (user) => user.notifications)
    user: UserEntity;

    @ManyToOne(() => CourseEntity, (course) => course.inscriptions)
    course: CourseEntity;
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
*/
