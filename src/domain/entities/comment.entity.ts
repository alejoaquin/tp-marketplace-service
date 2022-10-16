import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentStatus } from '../enums';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @ManyToOne(() => StudentEntity, (studen) => studen.comments)
    student: StudentEntity;

    @Column({
        type: 'enum',
        enum: CommentStatus,
    })
    status: CommentStatus;

    @Column()
    blockReason: string;

    @ManyToOne(() => CourseEntity, (course) => course.comments)
    course: CourseEntity;
}
