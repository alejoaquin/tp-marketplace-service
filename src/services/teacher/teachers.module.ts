import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from 'src/controllers/teachers.controller';
import { TeacherEntity } from 'src/domain/entities/teacher.entity';
import { TeachersService } from './teachers.service';

@Module({
    imports: [TypeOrmModule.forFeature([TeacherEntity])],
    providers: [TeachersService],
    controllers: [TeachersController],
    exports: [TeachersService],
})
export class TeachersModule {}
