import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CourseRequestEntity extends BaseEntity {
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

    @ManyToOne(() => StudentEntity, (student) => student.courseRequests)
    student: StudentEntity;

    @ManyToOne(() => CourseEntity, (course) => course.courseRequests)
    course: CourseEntity;
}
