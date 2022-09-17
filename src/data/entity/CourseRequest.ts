import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm'
import { Course } from './Course'
import { Student } from './Student'

@Entity()
export class CourseRequest extends BaseEntity {
    @Column()
    email: string

    @Column()
    phone: number

    @Column()
    preferredSchedule: string

    @Column()
    reason: string

    @Column()
    status: string

    @ManyToOne(() => Student, (student) => student.courseRequests)
    student: Student

    @ManyToOne(() => Course, (course) => course.courseRequests)
    course: Course
}
