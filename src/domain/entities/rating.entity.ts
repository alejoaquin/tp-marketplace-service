import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    score: number;

    @ManyToOne(() => StudentEntity, (student) => student.ratings, {
        onDelete: 'CASCADE',
    })
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.rating, {
        onDelete: 'CASCADE',
    })
    course: CourseEntity;
}
