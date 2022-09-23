import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Comment } from './comment.entity';
import { CourseRequest } from './course.request.entity';
import { Professor } from './professor.entity';
import { Scoring } from './scoring.entity';
import { Student } from './student.entity';

@Entity()
export class Course extends BaseEntity {
    @Column()
    name: string;

    @Column()
    subject: string;

    @Column()
    duration: number;

    @Column()
    frecuency: string;

    @Column()
    cost: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    isPublished: boolean;

    @Column()
    score: number;

    @ManyToOne(() => Professor, (professor) => professor.courses)
    professor: Professor;

    @OneToMany(() => CourseRequest, (courseRequest) => courseRequest.course)
    courseRequests: CourseRequest[];

    @OneToMany(() => Scoring, (scoring) => scoring.course)
    scorings: Scoring[];

    @OneToMany(() => Comment, (comment) => comment.course)
    comments: Comment[];

    @ManyToMany(() => Student, (student) => student.courses)
    @JoinTable()
    students: Student[];
}
