import { EducationEntity } from '../entities';
import { Role } from '../enums';

export class StudentDto {
    id: string;
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    role: Role;
    password: string;
    birthday: Date;
    educationalDegrees: EducationEntity[];
}
