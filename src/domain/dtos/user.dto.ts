import { Role } from '../enums';

export class UserDto {
    id: string;
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    password: string;
    role: Role;
}
