import { Injectable } from '@nestjs/common';
import { CommentDto, CommentEntity } from 'src/domain';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class CommentsFactoryService {
    constructor(private usersFactoryService: UsersFactoryService) {}

    async toDto(entity: CommentEntity): Promise<CommentDto> {
        const dto = new CommentDto();
        console.log(entity.id);
        dto.id = entity.id;
        console.log('gola');
        dto.description = entity.description;
        dto.student = this.usersFactoryService.userToBasicDto(
            await entity.student,
        );
        dto.status = entity.status;
        dto.blockReason = entity.blockReason;
        return dto;
    }
}
