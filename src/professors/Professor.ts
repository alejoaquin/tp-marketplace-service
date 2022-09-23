import { Column, Entity, OneToMany } from 'typeorm';
import { Course } from './Course';
import { User } from './User';

@Entity()
export class Professor extends User {
  @Column()
  title: string;

  @Column()
  experience: string;

  @OneToMany(() => Course, (course) => course.professor)
  courses: Course[];
}
