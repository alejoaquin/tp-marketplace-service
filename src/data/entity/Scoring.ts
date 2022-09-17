import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm'
import { Course } from './Course'
import { Student } from './Student'

@Entity()
export class Scoring extends BaseEntity {
    @Column()
    score: number

    @ManyToOne(() => Student, (student) => student.studies)
    student: Student

    @ManyToOne(() => Course, (course) => course.scorings)
    course: Course
}