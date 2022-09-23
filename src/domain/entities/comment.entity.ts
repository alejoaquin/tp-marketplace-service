import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => StudentEntity, (student) => student.comments)
    student: StudentEntity;

    @Column()
    blockingReason: string;

    @ManyToOne(() => CourseEntity, (course) => course.comments)
    course: CourseEntity;
}
