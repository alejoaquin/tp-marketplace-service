import { Column, Entity } from 'typeorm';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class TeacherEntity extends UserEntity {
    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    experience: string;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
    ) {
        super(id, firstname, lastname, phone, email, password, role);
    }
}
