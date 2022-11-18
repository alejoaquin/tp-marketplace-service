import { Role } from '../enums';

export class TeacherDto {
    id: string;
    firstname: string;
    lastname: string;
    title: string;
    experience: string;
    phone: number;
    email: string;
    role: Role;
    password: string;
}
