import { CourseDto } from './course.dto';
import { StudentDto } from './student.dto';

export class CourseRequestDto {
    id: string;

    email: string;

    phone: number;

    preferredSchedule: string;

    reason: string;

    status: string;

    student: StudentDto;

    course: CourseDto;
}
