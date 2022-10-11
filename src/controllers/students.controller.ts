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
    async getById(@Param('id') id: any) {
        return this.studentServices.getById(id);
    }

    @Post()
    create(@Body() studentDto: StudentDto) {
        return this.studentServices.create(studentDto);
    }

    @Put(':id')
    update(@Param('id') studenId: string, @Body() studentDto: StudentDto) {
        return this.studentServices.update(studenId, studentDto);
    }

    @Delete(':id')
    delete(@Param('id') studenId: string) {
        return this.studentServices.delete(studenId);
    }
}
