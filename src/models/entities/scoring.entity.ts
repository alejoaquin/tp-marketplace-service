import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity()
export class Scoring extends BaseEntity {
    @Column()
    score: number;

    @ManyToOne(() => Student, (student) => student.scorings)
    student: Student;

    @ManyToOne(() => Course, (course) => course.scorings)
    course: Course;
}
