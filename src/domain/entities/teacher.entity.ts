import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class TeacherEntity extends UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    experience: string;

    //@OneToMany(() => Course, (course) => course.professor)
    //courses: Course[];

    constructor(
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
    ) {
        super(firstname, lastname, phone, email, password, role);
    }
}
