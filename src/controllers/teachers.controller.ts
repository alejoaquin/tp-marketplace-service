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
import { TeachersFactoryService } from 'src/services/teacher/teachers-factory.service';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('teachers')
export class TeachersController {
    constructor(
        private teachersService: TeachersService,
        private teachersFactoryService: TeachersFactoryService,
    ) {}

    @Get()
    async getAll(): Promise<TeacherDto[]> {
        const arr = await this.teachersService.getAll();
        return Promise.all(
            arr.map((t) => this.teachersFactoryService.toDto(t)),
        );
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<TeacherDto> {
        const entity = await this.teachersService.getById(id);
        return this.teachersFactoryService.toDto(entity);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() teacher: TeacherDto,
    ): Promise<void> {
        return this.teachersService.updatePartial(id, teacher);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<void> {
        return this.teachersService.delete(id);
    }
}
