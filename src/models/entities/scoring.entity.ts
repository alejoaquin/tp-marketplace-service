import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class ScoringEntity extends BaseEntity {
    @Column()
    score: number;

    @ManyToOne(() => StudentEntity, (student) => student.scorings)
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.scorings)
    course: CourseEntity;
}
