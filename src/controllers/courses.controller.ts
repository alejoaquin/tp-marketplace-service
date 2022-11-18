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
import {
    CommentDto,
    CommentRequest,
    CourseDto,
    CourseRequest,
    CourseSearchRequest,
    EnrollRequest,
    InscriptionDto,
    UpdateInscriptionRequest,
} from 'src/domain';
import { Public } from 'src/public.decorator';
import { CommentsService } from 'src/services/comments/comments.service';
import { CoursesService } from 'src/services/courses/courses.service';
import { InscriptionsService } from 'src/services/inscriptions/inscriptions.service';

@Controller('courses')
export class CoursesController {
    constructor(
        private coursesService: CoursesService,
        private commentsService: CommentsService,
        private inscriptionsService: InscriptionsService,
    ) {}

    @Public()
    @Get()
    async getPublished(): Promise<CourseDto[]> {
        return this.coursesService.getPublished();
    }

    @Post()
    @HttpCode(201)
    create(@Body() course: CourseRequest): Promise<CourseDto> {
        return this.coursesService.create(course);
    }

    @Public()
    @Post('search')
    @HttpCode(200)
    search(@Body() searchRequest: CourseSearchRequest): Promise<CourseDto[]> {
        return this.coursesService.search(searchRequest);
    }

    @Public()
    @Get(':id')
    async getById(@Param('id') id: string): Promise<CourseDto> {
        return this.coursesService.getById(id);
    }

    @Put(':id')
    @HttpCode(200)
    update(
        @Param('id') id: string,
        @Body() course: CourseRequest,
    ): Promise<void> {
        return this.coursesService.update(id, course);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<void> {
        return this.coursesService.delete(id);
    }

    @Post(':id/inscriptions')
    @HttpCode(201)
    enroll(
        @Param('id') id: string,
        @Body() enrollRequest: EnrollRequest,
    ): Promise<InscriptionDto> {
        return this.coursesService.enroll(id, enrollRequest);
    }

    @Get(':id/inscriptions')
    async getInscriptions(@Param('id') id: string): Promise<InscriptionDto[]> {
        return this.inscriptionsService.getByCourse(id);
    }

    @Get(':id/inscriptions/:inscriptionId')
    async getInscriptionById(
        @Param('id') id: string,
        @Param('inscriptionId') inscriptionId: string,
    ): Promise<InscriptionDto> {
        return this.inscriptionsService.getByIdAndCourse(inscriptionId, id);
    }

    @Put(':id/inscriptions/:inscriptionId')
    updateInscriptionById(
        @Param('id') id: string,
        @Param('inscriptionId') inscriptionId: string,
        @Body() updateRequest: UpdateInscriptionRequest,
    ): Promise<InscriptionDto> {
        return this.inscriptionsService.update(
            inscriptionId,
            id,
            updateRequest,
        );
    }

    @Post(':id/comments')
    @HttpCode(201)
    comment(
        @Param('id') id: string,
        @Body() comment: CommentRequest,
    ): Promise<CommentDto> {
        return this.coursesService.addComment(id, comment);
    }

    @Public()
    @Get(':id/comments')
    getComments(@Param('id') id: string): Promise<CommentDto[]> {
        return this.commentsService.getByCourse(id);
    }

    @Get(':id/comments/:commentId')
    getComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
    ): Promise<CommentDto> {
        return this.commentsService.getByIdAndCourse(commentId, id);
    }

    @Put(':id/comments/:commentId')
    updateComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
        @Body() updateRequest: CommentRequest,
    ): Promise<CommentDto> {
        return this.commentsService.update(commentId, id, updateRequest);
    }
}
