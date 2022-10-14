import { Column, Entity, OneToMany } from 'typeorm';
import { EducationEntity } from './education.entity';
import { UserEntity } from './user.abstract.entity';

@Entity()
export class StudentEntity extends UserEntity {
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

    @Column({ nullable: true })
    birthday: Date;

    @OneToMany(() => EducationEntity, (education) => education.student)
    educationalDegrees: EducationEntity[];
}
