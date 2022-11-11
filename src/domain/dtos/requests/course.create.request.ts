import { CourseFrequency, CourseType } from 'src/domain/enums';

export class CreateCourseRequest {
    name: string;
    subject: string;
    duration: number;
    frequency: CourseFrequency;
    price: number;
    description: string;
    type: CourseType;
    teacherId: string;
    imgSrc: string;
}
