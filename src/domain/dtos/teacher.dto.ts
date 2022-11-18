import { Role } from '../enums';

export class TeacherDto {
    id: string;
    name: string;
    lastname: string;
    title: string;
    experience: string;
    phone: number;
    email: string;
    role: Role;
}
