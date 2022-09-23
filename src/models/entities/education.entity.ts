import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Student } from './student.entity';

@Entity()
export class Education extends BaseEntity {
    @Column()
    degree: string;

    @Column()
    status: string;

    @Column()
    description: string;

    @ManyToOne(() => Student, (student) => student.educationalDegrees)
    student: Student;
}
