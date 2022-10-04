import { UserDto } from './user.abstract.dto';

export class StudentDto extends UserDto {
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

    birthday: Date;
}
