import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EducationLevel, EducationStatus } from '../enums';
import { StudentEntity } from './student.entity';

@Entity()
export class EducationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: EducationLevel,
    })
    level: string;

    @Column({
        type: 'enum',
        enum: EducationStatus,
    })
    status: string;

    @ManyToOne(() => StudentEntity, (student) => student.educationalDegrees)
    student: StudentEntity;
}
