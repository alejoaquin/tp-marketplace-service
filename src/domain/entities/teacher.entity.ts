import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../enums';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity()
export class TeacherEntity extends UserEntity {
    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    experience: string;

    @OneToMany(() => CourseEntity, (course) => course.teacher, {
        eager: true,
        cascade: true,
    })
    courses: CourseEntity[];

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: Role,
    ) {
        super(id, firstname, lastname, phone, email, password, role);
    }
}
