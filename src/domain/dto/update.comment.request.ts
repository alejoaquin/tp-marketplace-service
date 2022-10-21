import { CommentStatus } from '../enums';

export class UpdateCommentRequest {
    id: string;
    description: string;
    studentId: string;
    status: CommentStatus;
}
