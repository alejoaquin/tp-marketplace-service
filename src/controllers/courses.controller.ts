import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import {
    CommentRequest,
    CourseEntity,
    EnrollRequest,
    InscriptionEntity,
} from 'src/domain';
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

    @Post(':id/inscriptions')
    enroll(
        @Param('id') id: string,
        @Body() enrollRequest: EnrollRequest,
    ): Promise<CourseEntity> {
        return this.coursesService.enroll(id, enrollRequest);
    }

    @Get(':id/inscriptions')
    async getInscriptions(
        @Param('id') id: string,
    ): Promise<InscriptionEntity[]> {
        return this.coursesService.getInscriptions(id);
    }

    @Post(':id/comments')
    comment(
        @Param('id') id: string,
        @Body() comment: CommentRequest,
    ): Promise<CourseEntity> {
        return this.coursesService.addComment(id, comment);
    }

    @Put(':id/comments/:commentId')
    updateComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
        @Body() comment: CommentRequest,
    ): Promise<CourseEntity> {
        return this.coursesService.updateComment(id, commentId, comment);
    }
}
