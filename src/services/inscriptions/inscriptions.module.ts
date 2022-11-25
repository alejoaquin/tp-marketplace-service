import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionEntity } from 'src/domain';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { InscriptionsFactoryService } from './inscriptions.factory.service';
import { InscriptionsService } from './inscriptions.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([InscriptionEntity]),
        UsersModule,
        NotificationsModule,
    ],
    providers: [InscriptionsService, InscriptionsFactoryService],
    exports: [InscriptionsService, InscriptionsFactoryService],
})
export class InscriptionsModule {}
