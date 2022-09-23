import { CourseDto } from './course.dto';
import { UserDto } from './user.abstract.dto';

export class ProfessorDto extends UserDto {
    title: string;

    experience: string;

    courses: CourseDto[];
}
