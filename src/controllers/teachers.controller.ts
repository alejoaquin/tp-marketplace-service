import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Put,
} from '@nestjs/common';
import { CourseEntity, TeacherEntity } from 'src/domain';
import { Public } from 'src/public.decorator';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) {}

    @Get()
    async getAll(): Promise<TeacherEntity[]> {
        return this.teachersService.getAll();
    }

    @Public()
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

    @Public()
    @Get(':id/courses')
    async getCourses(@Param('id') id: string): Promise<CourseEntity[]> {
        const teacher = await this.teachersService.getById(id);
        return teacher.courses;
    }
}
