import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InscriptionStatus } from '../enums';
import { CourseEntity } from './course.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class InscriptionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    phone: number;

    @Column()
    email: string;

    @Column()
    reason: string;

    @Column()
    timeRangeFrom: string;

    @Column()
    timeRangeTo: string;

    @ManyToOne(() => StudentEntity, (student) => student.inscriptions)
    student: Promise<StudentEntity>;

    @Column({
        type: 'enum',
        enum: InscriptionStatus,
        default: InscriptionStatus.PENDING,
    })
    status: InscriptionStatus;

    @ManyToOne(() => CourseEntity, (course) => course.inscriptions)
    course: Promise<CourseEntity>;
}
