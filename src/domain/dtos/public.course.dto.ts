import { CourseFrequency, CourseType } from '../enums';
import { CommentDto } from './comment.dto';
import { UserBasicInfoDto } from './user.basic.info.dto';

export class PublicCourseDto {
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
    imgSrc: string;
}
