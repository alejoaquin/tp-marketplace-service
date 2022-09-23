import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class ScoringEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @ManyToOne(() => StudentEntity, (student) => student.scorings)
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.scorings)
    course: CourseEntity;
}
