import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CourseRequestEntity } from './course.request.entity';
import { ProfessorEntity } from './professor.entity';
import { ScoringEntity } from './scoring.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ManyToOne(() => ProfessorEntity, (professor) => professor.courses)
    professor: ProfessorEntity;

    @OneToMany(
        () => CourseRequestEntity,
        (courseRequest) => courseRequest.course,
    )
    courseRequests: CourseRequestEntity[];

    @OneToMany(() => ScoringEntity, (scoring) => scoring.course)
    scorings: ScoringEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.course)
    comments: CommentEntity[];

    @ManyToMany(() => StudentEntity, (student) => student.courses)
    @JoinTable()
    students: StudentEntity[];
}
