import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StudentEntity } from './student.entity';

@Entity()
export class EducationEntity extends BaseEntity {
    @Column()
    degree: string;

    @Column()
    status: string;

    @Column()
    description: string;

    @ManyToOne(() => StudentEntity, (student) => student.educationalDegrees)
    student: StudentEntity;
}
