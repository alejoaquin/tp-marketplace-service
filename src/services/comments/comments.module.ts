import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domain';
import { CommentsService } from './comments.service';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity])],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}
