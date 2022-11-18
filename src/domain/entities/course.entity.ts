import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseFrequency } from '../enums/course.frequency.enum';
import { CourseType } from '../enums/course.type.enum';
import { CommentEntity } from './comment.entity';
import { InscriptionEntity } from './inscription.entity';
import { RatingEntity } from './rating.entity';
import { TeacherEntity } from './teacher.entity';

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

    @Column({
        type: 'enum',
        enum: CourseFrequency,
    })
    frequency: CourseFrequency;

    @Column()
    price: number;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 0 })
    rating: number;

    @Column({
        type: 'enum',
        enum: CourseType,
    })
    type: CourseType;

    @ManyToOne(() => TeacherEntity, (teacher) => teacher.courses, {
        onDelete: 'CASCADE',
    })
    teacher: Promise<TeacherEntity>;

    @OneToMany(() => CommentEntity, (comment) => comment.course, {
        eager: true,
        cascade: true,
    })
    comments: CommentEntity[];

    @OneToMany(() => RatingEntity, (rating) => rating.course, {
        eager: true,
        cascade: true,
    })
    ratings: RatingEntity[];

    @Column({ default: true })
    published: boolean;

    @Column({ nullable: true })
    imgSrc: string;

    @OneToMany(() => InscriptionEntity, (inscription) => inscription.course, {
        eager: true,
        cascade: true,
    })
    inscriptions: InscriptionEntity[];
}
