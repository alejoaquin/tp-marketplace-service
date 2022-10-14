import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controllers/students.controller';
import { EducationEntity, StudentEntity } from 'src/domain';
import { EducationFactoryService } from './education-factory.service';
import { StudentsFactoryService } from './students-factory.service';
import { StudentsService } from './students.service';

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, EducationEntity])],
    providers: [
        StudentsFactoryService,
        EducationFactoryService,
        StudentsService,
    ],
    controllers: [StudentController],
    exports: [StudentsService],
})
export class StudentsModule {}
