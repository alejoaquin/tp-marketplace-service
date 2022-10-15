import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CourseEntity } from 'src/domain';
import { CoursesService } from 'src/services/courses/courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) {}

    @Get()
    async getAll(): Promise<CourseEntity[]> {
        return this.coursesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<CourseEntity> {
        return this.coursesService.getById(id);
    }

    @Post()
    create(@Body() course: CourseEntity): Promise<CourseEntity> {
        return this.coursesService.create(course);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() course: CourseEntity,
    ): Promise<CourseEntity> {
        return this.coursesService.update(id, course);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<CourseEntity> {
        return this.coursesService.delete(id);
    }
}
