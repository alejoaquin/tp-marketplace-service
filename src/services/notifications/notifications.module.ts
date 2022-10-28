import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CommentEntity,
    InscriptionEntity,
    NotificationEntity,
} from 'src/domain';
import { NotificationsService } from './notifications.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NotificationEntity,
            CommentEntity,
            InscriptionEntity,
        ]),
    ],
    providers: [NotificationsService],
    controllers: [],
    exports: [NotificationsService],
})
export class NotificationsModule {}
