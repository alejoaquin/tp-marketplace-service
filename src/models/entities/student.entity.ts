import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';
import { Course } from './course.entity';
import { CourseRequest } from './course.request.entity';
import { Education } from './education.entity';
import { Scoring } from './scoring.entity';
import { User } from './user.abstract.entity';

@Entity()
export class Student extends User {
    @Column()
    birthday: Date;

    @OneToMany(() => Education, (education) => education.student)
    educationalDegrees: Education[];

    @OneToMany(() => CourseRequest, (requests) => requests.student)
    courseRequests: CourseRequest[];

    @OneToMany(() => Comment, (comment) => comment.student)
    comments: Comment[];

    @OneToMany(() => Scoring, (scoring) => scoring.student)
    scorings: Scoring[];

    @ManyToMany(() => Course, (course) => course.students)
    courses: Course[];
}
