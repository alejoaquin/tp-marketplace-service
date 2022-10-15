import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { StudentEntity } from 'src/domain';
import { StudentsService } from 'src/services/students/students.service';

@Controller('students')
export class StudentController {
    constructor(private studentServices: StudentsService) {}

    @Get()
    async getAll(): Promise<StudentEntity[]> {
        return this.studentServices.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<StudentEntity> {
        return this.studentServices.getById(id);
    }

    @Post()
    create(@Body() student: StudentEntity): Promise<StudentEntity> {
        return this.studentServices.create(student);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() student: StudentEntity,
    ): Promise<StudentEntity> {
        return this.studentServices.update(id, student);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<StudentEntity> {
        return this.studentServices.delete(id);
    }
}
