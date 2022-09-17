import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm'
import { Course } from './Course'
import { Student } from './Student'

@Entity()
export class Comment extends BaseEntity {
    @Column()
    description: string

    @Column()
    status: string

    @ManyToOne(() => Student, (student) => student.comments)
    student: Student

    @Column()
    blockingReason: string

    @ManyToOne(() => Course, (course) => course.comments)
    course: Course
}
