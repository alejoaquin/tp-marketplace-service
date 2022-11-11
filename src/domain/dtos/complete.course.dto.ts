import { InscriptionDto, RatingDto } from '..';
import { CourseFrequency, CourseType } from '../enums';
import { CommentDto } from './comment.dto';
import { UserBasicInfoDto } from './user.basic.info.dto';

export class CompleteCourseDto {
    id: string;
    name: string;
    subject: string;
    duration: number;
    frequency: CourseFrequency;
    price: number;
    description: string;
    rating: number;
    type: CourseType;
    teacher: UserBasicInfoDto;
    comments: CommentDto[];
    published: boolean;
    imgSrc: string;
    inscriptions: InscriptionDto[];
}
