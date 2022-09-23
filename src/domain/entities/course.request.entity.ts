import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CourseRequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
