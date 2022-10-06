import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class StudentEntity extends UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    birthday: Date;

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
