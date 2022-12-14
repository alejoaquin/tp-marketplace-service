import { Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../enums';
import { CommentEntity } from './comment.entity';
import { EducationEntity } from './education.entity';
import { InscriptionEntity } from './inscription.entity';
import { RatingEntity } from './rating.entity';
import { UserEntity } from './user.entity';

@Entity()
export class StudentEntity extends UserEntity {
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

    @Column({ nullable: true })
    birthday: Date;

    @OneToMany(() => EducationEntity, (education) => education.student, {
        eager: true,
        cascade: true,
    })
    educationalDegrees: EducationEntity[];

    @OneToMany(() => CommentEntity, (comment) => comment.student, {
        cascade: true,
    })
    comments: CommentEntity[];

    @OneToMany(() => RatingEntity, (rating) => rating.student, {
        cascade: true,
    })
    ratings: RatingEntity[];

    @OneToMany(() => InscriptionEntity, (inscription) => inscription.student, {
        eager: true,
        cascade: true,
    })
    inscriptions: InscriptionEntity[];
}
