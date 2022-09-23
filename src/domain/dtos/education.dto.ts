import { StudentDto } from './student.dto';

export class EducationDto {
    id: string;

    degree: string;

    status: string;

    description: string;

    student: StudentDto;
}
