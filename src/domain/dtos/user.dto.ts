export class UserDto {
    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    id: string;

    firstname: string;

    lastname: string;

    phone: number;

    email: string;

    password: string;

    role: string;
}
