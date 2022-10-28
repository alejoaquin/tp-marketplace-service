import { CourseFrequency, CourseType } from '../enums';

export class CourseSearchRequest {
    name: string;
    subject: string;
    frequency: CourseFrequency;
    rating: number;
    type: CourseType;
}
