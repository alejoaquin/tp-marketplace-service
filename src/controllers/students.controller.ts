import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { StudentDto } from 'src/domain';
import { StudentsService } from 'src/services/students/students.service';

@Controller('students')
export class StudentController {
    constructor(private studentServices: StudentsService) {}

    @Get()
    async getAll() {
        return this.studentServices.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.studentServices.getById(id);
    }

    @Post()
    create(@Body() student: StudentDto) {
        return this.studentServices.create(student);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() student: StudentDto) {
        return this.studentServices.update(id, student);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.studentServices.delete(id);
    }
}
