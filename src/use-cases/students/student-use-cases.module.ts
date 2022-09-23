import { Module } from '@nestjs/common';
import { StudentFactoryService } from './student-factory.service';
import { StudentUseCase } from './student.use-case';

@Module({
    imports: [],
    providers: [StudentFactoryService, StudentUseCase],
    exports: [StudentFactoryService, StudentUseCase],
})
export class StudentUseCasesModule {}
