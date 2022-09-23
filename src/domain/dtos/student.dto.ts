import { CommentDto } from './comment.dto';
import { CourseDto } from './course.dto';
import { CourseRequestDto } from './course.request.dto';
import { EducationDto } from './education.dto';
import { ScoringDto } from './scoring.dto';
import { UserDto } from './user.abstract.dto';
import { NotificationDto } from './notification.dto';

export class StudentDto extends UserDto {
    constructor(
        id: string,
        firstname: string,
        lastname: string,
        phone: number,
        email: string,
        password: string,
        role: string,
        notifications: NotificationDto[],
    ) {
        super(
            id,
            firstname,
            lastname,
            phone,
            email,
            password,
            role,
            notifications,
        );
    }

    birthday: Date;

    educationalDegrees: EducationDto[];

    courseRequests: CourseRequestDto[];

    comments: CommentDto[];

    scorings: ScoringDto[];

    courses: CourseDto[];
}
