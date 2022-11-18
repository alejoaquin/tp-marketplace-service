import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionEntity } from 'src/domain';
import { UsersModule } from '../users/users.module';
import { InscriptionsFactoryService } from './inscriptions.factory.service';
import { InscriptionsService } from './inscriptions.service';

@Module({
    imports: [TypeOrmModule.forFeature([InscriptionEntity]), UsersModule],
    providers: [InscriptionsService, InscriptionsFactoryService],
    exports: [InscriptionsService, InscriptionsFactoryService],
})
export class InscriptionsModule {}
