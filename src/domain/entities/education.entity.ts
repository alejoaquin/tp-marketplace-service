import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity()
export class EducationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    degree: string;

    @Column()
    status: string;

    @Column()
    description: string;

    @ManyToOne(() => StudentEntity, (student) => student.educationalDegrees)
    student: StudentEntity;
}
