import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Put,
} from '@nestjs/common';
import { TeacherDto } from 'src/domain';
import { Public } from 'src/public.decorator';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    @Get()
    async getAll(): Promise<TeacherDto[]> {
        return this.teachersService.getAll();
    }

    @Public()
    @Get(':id')
    async getById(@Param('id') id: string): Promise<TeacherDto> {
        return this.teachersService.getById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() teacher: TeacherDto,
    ): Promise<void> {
        return this.teachersService.update(id, teacher);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<void> {
        return this.teachersService.delete(id);
    }
}
