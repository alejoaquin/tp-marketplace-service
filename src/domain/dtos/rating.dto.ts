import { UserBasicInfoDto } from './user.basic.info.dto';

export class RatingDto {
    id: string;
    score: number;
    student: UserBasicInfoDto;
}
