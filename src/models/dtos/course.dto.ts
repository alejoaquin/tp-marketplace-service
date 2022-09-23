import { CommentDto } from './comment.dto';
import { CourseRequestDto } from './course.request.dto';
import { ProfessorDto } from './professor.dto';
import { ScoringDto } from './scoring.dto';
import { StudentDto } from './student.dto';

export class CourseDto {
    id: string;

    name: string;

    subject: string;

    duration: number;

    frecuency: string;

    cost: number;

    description: string;

    type: string;

    isPublished: boolean;

    score: number;

    professor: ProfessorDto;

    courseRequests: CourseRequestDto[];

    scorings: ScoringDto[];

    comments: CommentDto[];

    students: StudentDto[];
}
