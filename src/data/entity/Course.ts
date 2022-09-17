import {
    BaseEntity,
    Column,
    Double,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Comment } from './Comment'
import { CourseRequest } from './CourseRequest'
import { Professor } from './Professor'
import { Scoring } from './Scoring'
import { Student } from './Student'

@Entity()
export class Course extends BaseEntity {
    @Column()
    name: string

    @Column()
    subject: string

    @Column()
    duration: number

    @Column()
    frecuency: string

    @Column()
    cost: Double

    @Column()
    description: string

    @Column()
    type: string

    @Column()
    isPublished: boolean

    @Column()
    score: number

    @ManyToOne(() => Professor, (professor) => professor.courses)
    professor: Professor

    @OneToMany(() => CourseRequest, (courseRequest) => courseRequest.course)
    courseRequests: CourseRequest[]

    @OneToMany(() => Scoring, (scoring) => scoring.course)
    scorings: Scoring[]

    @OneToMany(() => Comment, (comment) => comment.course)
    comments: Comment[]

    @ManyToMany(() => Student, (student) => student.courses)
    @JoinTable()
    students: Student[]
}
