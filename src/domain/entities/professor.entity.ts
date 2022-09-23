import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class ProfessorEntity extends UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    experience: string;

    @OneToMany(() => CourseEntity, (course) => course.professor)
    courses: CourseEntity[];
}
