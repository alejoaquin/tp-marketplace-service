import { Roles } from './role.enum';
import { UserDto } from './user.dto';

export class StudentDto extends UserDto {
    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: Roles,
    ) {
        super(id, firstname, lastname, phone, email, password, role);
    }

    birthday: Date;
}
