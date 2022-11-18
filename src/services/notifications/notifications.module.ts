import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CommentEntity,
    InscriptionEntity,
    NotificationEntity,
} from 'src/domain';
import { NotificationsFactoryService } from './notifications-factory.service';
import { NotificationsService } from './notifications.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NotificationEntity,
            CommentEntity,
            InscriptionEntity,
        ]),
    ],
    providers: [NotificationsService, NotificationsFactoryService],
    controllers: [],
    exports: [NotificationsService, NotificationsFactoryService],
})
export class NotificationsModule {}
