import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controllers/students.controller';
import { EducationEntity, StudentEntity } from 'src/domain';
import { StudentsService } from './students.service';

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity, EducationEntity])],
    providers: [StudentsService],
    controllers: [StudentController],
    exports: [StudentsService],
})
export class StudentsModule {}
