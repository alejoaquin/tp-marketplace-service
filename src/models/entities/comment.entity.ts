import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity()
export class Comment extends BaseEntity {
    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => Student, (student) => student.comments)
    student: Student;

    @Column()
    blockingReason: string;

    @ManyToOne(() => Course, (course) => course.comments)
    course: Course;
}
