import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CourseEntity } from './course.entity';
import { CourseRequestEntity } from './course.request.entity';
import { EducationEntity } from './education.entity';
import { ScoringEntity } from './scoring.entity';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class StudentEntity extends UserEntity {
    @Column()
    birthday: Date;

    @OneToMany(() => EducationEntity, (education) => education.student)
    educationalDegrees: EducationEntity[];

    @OneToMany(() => CourseRequestEntity, (requests) => requests.student)
    courseRequests: CourseRequestEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.student)
    comments: CommentEntity[];

    @OneToMany(() => ScoringEntity, (scoring) => scoring.student)
    scorings: ScoringEntity[];

    @ManyToMany(() => CourseEntity, (course) => course.students)
    courses: CourseEntity[];
}
