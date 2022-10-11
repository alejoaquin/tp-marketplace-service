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
    async getById(@Param('id') id: string) {
        return this.teachersService.getById(id);
    }

    @Post()
    create(@Body() teacher: TeacherDto) {
        return this.teachersService.create(teacher);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() teacher: TeacherDto) {
        return this.teachersService.update(id, teacher);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.teachersService.delete(id);
    }
}
