import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from 'src/domain';
import { Repository } from 'typeorm';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(RatingEntity)
        private ratingRepository: Repository<RatingEntity>,
    ) {}

    get(id: string): Promise<RatingEntity> {
        return this.ratingRepository.findOneByOrFail({ id: id });
    }

    getByCourse(courseId: string): Promise<RatingEntity[]> {
        return this.ratingRepository.findBy({
            course: { id: courseId },
        });
    }

    getByIdAndCourse(id: string, courseId: string): Promise<RatingEntity> {
        return this.ratingRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
    }

    async update(
        id: string,
        courseId: string,
        rating: RatingEntity,
    ): Promise<void> {
        const entity = await this.ratingRepository.findOneByOrFail({
            id: id,
            course: { id: courseId },
        });
        entity.score = rating.score;

        await this.ratingRepository.save(entity);
    }
}
