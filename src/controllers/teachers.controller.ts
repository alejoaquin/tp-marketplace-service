import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { TeacherEntity } from 'src/domain';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    @Get()
    async getAll(): Promise<TeacherEntity[]> {
        return this.teachersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<TeacherEntity> {
        return this.teachersService.getById(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() teacher: TeacherEntity,
    ): Promise<TeacherEntity> {
        return this.teachersService.update(id, teacher);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<TeacherEntity> {
        return this.teachersService.delete(id);
    }
}
