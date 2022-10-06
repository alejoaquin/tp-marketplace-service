import { UserDto } from './user.dto';

export class TeacherDto extends UserDto {
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

    title: string;
    experience: string;
}