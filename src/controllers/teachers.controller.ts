import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { TeacherDto } from 'src/domain/dtos/teacher.dto';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    @Get()
    async getAll() {
        return this.teachersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: any) {
        return this.teachersService.getById(id);
    }

    @Post()
    createAuthor(@Body() teacherDto: TeacherDto) {
        return this.teachersService.create(teacherDto);
    }

    @Put(':id')
    updateAuthor(
        @Param('id') teacherId: string,
        @Body() teacherDto: TeacherDto,
    ) {
        return this.teachersService.update(teacherId, teacherDto);
    }

    @Delete(':id')
    delete(@Param('id') teacherId: string) {
        return this.teachersService.delete(teacherId);
    }
}
