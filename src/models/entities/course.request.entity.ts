import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity()
export class CourseRequest extends BaseEntity {
    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    preferredSchedule: string;

    @Column()
    reason: string;

    @Column()
    status: string;

    @ManyToOne(() => Student, (student) => student.courseRequests)
    student: Student;

    @ManyToOne(() => Course, (course) => course.courseRequests)
    course: Course;
}
