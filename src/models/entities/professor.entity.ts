import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.abstract.entity';

@Entity()
export class Professor extends User {
    @Column()
    title: string;

    @Column()
    experience: string;

    @OneToMany(() => Course, (course) => course.professor)
    courses: Course[];
}
