import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from 'src/domain';
import { UsersModule } from '../users/users.module';
import { RatingsFactoryService } from './ratings-factory.service';
import { RatingsService } from './ratings.service';

@Module({
    imports: [TypeOrmModule.forFeature([RatingEntity]), UsersModule],
    providers: [RatingsService, RatingsFactoryService],
    exports: [RatingsService, RatingsFactoryService],
})
export class RatingsModule {}
