import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/controllers/students.controller';
import { StudentEntity } from 'src/domain';
import { StudentsFactoryService } from './students-factory.service';
import { StudentsService } from './students.service';

@Module({
    imports: [TypeOrmModule.forFeature([StudentEntity])],
    providers: [StudentsFactoryService, StudentsService],
    controllers: [StudentController],
})
export class StudentsModule {}
