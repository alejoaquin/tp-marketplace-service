import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CommentEntity extends BaseEntity {
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
