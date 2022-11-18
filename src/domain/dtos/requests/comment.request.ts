import { CommentStatus } from '../../enums';

export class CommentRequest {
    description: string;
    studentId: string;
    status: CommentStatus;
}
