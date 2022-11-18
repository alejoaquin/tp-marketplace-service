import { TeacherDto, InscriptionDto } from '..';
import { CourseFrequency, CourseType } from '../enums';
import { CommentDto } from './comment.dto';

export class CourseDto {
    id: string;
    name: string;
    subject: string;
    duration: number;
    frequency: CourseFrequency;
    price: number;
    description: string;
    rating: number;
    type: CourseType;
    teacher: TeacherDto;
    comments: CommentDto[];
    published: boolean;
    imgSrc: string;
    inscriptions: InscriptionDto[];
}
