import { CommentStatus } from '../enums';
import { UserBasicInfoDto as BasicUserInfoDto } from './user.basic.info.dto';

export class CommentDto {
    id: string;
    description: string;
    student: BasicUserInfoDto;
    status: CommentStatus;
    blockReason: string;
}
