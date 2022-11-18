import { Injectable } from '@nestjs/common';
import { CommentDto, CommentEntity } from 'src/domain';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class CommentsFactoryService {
    constructor(private usersFactoryService: UsersFactoryService) {}

    async toDto(entity: CommentEntity): Promise<CommentDto> {
        const dto = new CommentDto();
        dto.id = entity.id;
        dto.description = entity.description;
        dto.student = this.usersFactoryService.toBasicDto(await entity.student);
        dto.status = entity.status;
        dto.blockReason = entity.blockReason;
        return dto;
    }
}
