import { CommentDto } from './comment.dto';
import { CourseDto } from './course.dto';
import { CourseRequestDto } from './course.request.dto';
import { EducationDto } from './education.dto';
import { ScoringDto } from './scoring.dto';
import { UserDto } from './user.abstract.dto';

export class StudentDto extends UserDto {
    birthday: Date;

    educationalDegrees: EducationDto[];

    courseRequests: CourseRequestDto[];

    comments: CommentDto[];

    scorings: ScoringDto[];

    courses: CourseDto[];
}
