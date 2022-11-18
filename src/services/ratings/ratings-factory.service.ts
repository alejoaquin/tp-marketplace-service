import { Injectable } from '@nestjs/common';
import { RatingDto, RatingEntity } from 'src/domain';
import { UsersFactoryService } from '../users/users-factory.service';

@Injectable()
export class RatingsFactoryService {
    constructor(private usersFactoryService: UsersFactoryService) {}

    async toDto(entity: RatingEntity): Promise<RatingDto> {
        const dto = new RatingDto();
        dto.id = entity.id;
        dto.score = entity.score;
        dto.student = this.usersFactoryService.toBasicDto(await entity.student);
        return dto;
    }

    async toEntity(dto: RatingDto): Promise<RatingEntity> {
        const entity = new RatingEntity();
        entity.id = dto.id;
        entity.score = dto.score;
        return entity;
    }
}
