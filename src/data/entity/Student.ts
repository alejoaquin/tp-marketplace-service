import { Column, Entity, ManyToMany, OneToMany } from 'typeorm'
import { Comment } from './Comment'
import { Course } from './Course'
import { CourseRequest } from './CourseRequest'
import { Education } from './Education'
import { Scoring } from './Scoring'
import { User } from './User'

@Entity()
export class Student extends User {
    @Column()
    birthday: Date

    @OneToMany(() => Education, (education) => education.student)
    educationalDegrees: Education[]

    @OneToMany(() => CourseRequest, (requests) => requests.student)
    courseRequests: CourseRequest[]

    @OneToMany(() => Comment, (comment) => comment.student)
    comments: Comment[]

    @OneToMany(() => Scoring, (scoring) => scoring.student)
    scorings: Scoring[]

    @ManyToMany(() => Course, (course) => course.students)
    courses: Course[]
}
