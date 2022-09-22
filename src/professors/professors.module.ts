import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';

@Module({
  controllers: [ProfessorsController]
})
export class ProfessorsModule {}
