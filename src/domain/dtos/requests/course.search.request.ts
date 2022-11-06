import { CourseFrequency, CourseType } from 'src/domain/enums';

export class CourseSearchRequest {
    name: string;
    subject: string;
    frequency: CourseFrequency;
    rating: number;
    type: CourseType;
}
