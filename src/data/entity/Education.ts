import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm'
import { Student } from './Student'

@Entity()
export class Education extends BaseEntity {
    @Column()
    degree: string

    @Column()
    status: string

    @Column()
    description: string

    @ManyToOne(() => Student, (student) => student.educationalDegrees)
    student: Student
}
