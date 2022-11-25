import { Injectable } from '@nestjs/common';
import {
    AuthenticatedUserDto,
    StudentEntity,
    TeacherEntity,
    UserBasicInfoDto,
    UserEntity,
} from 'src/domain';
import { UserDto } from 'src/domain/dtos/user.dto';

@Injectable()
export class UsersFactoryService {
    userToTeacher(user: UserEntity): TeacherEntity {
        const teacher = new TeacherEntity(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return teacher;
    }

    userToStudent(user: UserEntity): StudentEntity {
        const student = new StudentEntity(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return student;
    }

    toDto(entity: UserEntity): UserDto {
        const dto = new UserDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        dto.phone = entity.phone;
        dto.email = entity.email;
        dto.password = entity.password;
        dto.role = entity.role;
        return dto;
    }

    toEntity(user: UserDto): UserEntity {
        const entity = new UserEntity(
            user.id,
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.password,
            user.role,
        );
        return entity;
    }

    toBasicDto(entity: UserEntity): UserBasicInfoDto {
        const dto = new UserBasicInfoDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        return dto;
    }

    toAuthenticatedUser(entity: UserEntity): AuthenticatedUserDto {
        const dto = new AuthenticatedUserDto();
        dto.id = entity.id;
        dto.firstname = entity.firstname;
        dto.lastname = entity.lastname;
        return dto;
    }
}
