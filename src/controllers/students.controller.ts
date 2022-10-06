import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentDto } from 'src/domain';
import { StudentsService } from 'src/services/students/students.service';

@Controller('students')
export class StudentController {
    constructor(private studentUseCases: StudentsService) {}

    @Get()
    async getAll() {
        return this.studentUseCases.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: any) {
        return this.studentUseCases.getById(id);
    }

    @Post()
    createAuthor(@Body() studentDto: StudentDto) {
        return this.studentUseCases.create(studentDto);
    }

    @Put(':id')
    updateAuthor(
        @Param('id') studenId: string,
        @Body() studentDto: StudentDto,
    ) {
        return this.studentUseCases.update(studenId, studentDto);
    }
}
