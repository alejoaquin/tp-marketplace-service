import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/domain';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { CommentsFactoryService } from './comments.factory.service';
import { CommentsService } from './comments.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentEntity]),
        UsersModule,
        NotificationsModule,
    ],
    providers: [CommentsService, CommentsFactoryService],
    exports: [CommentsService, CommentsFactoryService],
})
export class CommentsModule {}
