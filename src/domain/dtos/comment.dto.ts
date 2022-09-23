import { CourseDto } from './course.dto';
import { StudentDto } from './student.dto';

export class CommentDto {
    id: string;

    description: string;

    status: string;

    student: StudentDto;

    blockingReason: string;

    course: CourseDto;
}
