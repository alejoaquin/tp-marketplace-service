import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InscriptionEntity } from 'src/domain';
import { InscriptionsService } from './inscriptions.service';

@Module({
    imports: [TypeOrmModule.forFeature([InscriptionEntity])],
    providers: [InscriptionsService],
    exports: [InscriptionsService],
})
export class InscriptionsModule {}
