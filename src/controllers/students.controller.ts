import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Put,
} from '@nestjs/common';
import { StudentDto } from 'src/domain';
import { StudentsFactoryService } from 'src/services/students/students-factory.service';
import { StudentsService } from 'src/services/students/students.service';

@Controller('students')
export class StudentController {
    constructor(
        private studentServices: StudentsService,
        private studentsFactoryService: StudentsFactoryService,
    ) {}

    @Get()
    async getAll(): Promise<StudentDto[]> {
        const arr = await this.studentServices.getAll();
        return Promise.all(
            arr.map((s) => this.studentsFactoryService.toCompleteDto(s)),
        );
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<StudentDto> {
        const entity = await this.studentServices.getById(id);
        return this.studentsFactoryService.toCompleteDto(entity);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() student: StudentDto,
    ): Promise<void> {
        return this.studentServices.update(
            id,
            this.studentsFactoryService.toEntity(student),
        );
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<void> {
        return this.studentServices.delete(id);
    }
}
