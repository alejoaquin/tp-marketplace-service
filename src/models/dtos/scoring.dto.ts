import { CourseDto } from './course.dto';
import { StudentDto } from './student.dto';

export class ScoringDto {
    id: string;

    score: number;

    student: StudentDto;

    course: CourseDto;
}
