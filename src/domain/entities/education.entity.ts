import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity()
export class EducationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column()
    level: string;

    @Column()
    status: string;

    @ManyToOne(() => StudentEntity, (student) => student.educationalDegrees)
    student: StudentEntity;
}
