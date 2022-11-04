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
    CommentEntity,
    CommentRequest,
    CourseEntity,
    CourseSearchRequest,
    EnrollRequest,
    InscriptionEntity,
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
    async getAll(): Promise<CourseEntity[]> {
        return this.coursesService.getAll();
    }

    @Post()
    @HttpCode(201)
    create(@Body() course: CourseEntity): Promise<CourseEntity> {
        return this.coursesService.create(course);
    }

    @Post('search')
    @HttpCode(200)
    search(
        @Body() searchRequest: CourseSearchRequest,
    ): Promise<CourseEntity[]> {
        return this.coursesService.search(searchRequest);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<CourseEntity> {
        return this.coursesService.getById(id);
    }

    @Put(':id')
    @HttpCode(200)
    update(
        @Param('id') id: string,
        @Body() course: CourseEntity,
    ): Promise<CourseEntity> {
        return this.coursesService.update(id, course);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<CourseEntity> {
        return this.coursesService.delete(id);
    }

    @Post(':id/inscriptions')
    @HttpCode(201)
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

    @Get(':id/inscriptions/:inscriptionId')
    async getInscriptionById(
        @Param('id') id: string,
        @Param('inscriptionId') inscriptionId: string,
    ): Promise<InscriptionEntity> {
        return this.coursesService.getInscriptionById(id, inscriptionId);
    }

    @Put(':id/inscriptions/:inscriptionId')
    updateInscriptionById(
        @Param('id') id: string,
        @Param('inscriptionId') inscriptionId: string,
        @Body() updateRequest: UpdateInscriptionRequest,
    ): Promise<InscriptionEntity> {
        return this.inscriptionsService.update(
            id,
            inscriptionId,
            updateRequest,
        );
    }

    @Post(':id/comments')
    @HttpCode(201)
    comment(
        @Param('id') id: string,
        @Body() comment: CommentRequest,
    ): Promise<CourseEntity> {
        return this.coursesService.addComment(id, comment);
    }

    @Get(':id/comments')
    getComments(@Param('id') id: string): Promise<CommentEntity[]> {
        return this.coursesService.getComments(id);
    }

    @Get(':id/comments/:commentId')
    getComment(@Param('id') id: string): Promise<CommentEntity> {
        return this.commentsService.get(id);
    }

    @Put(':id/comments/:commentId')
    updateComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
        @Body() updateRequest: CommentRequest,
    ): Promise<CommentEntity> {
        return this.commentsService.update(id, commentId, updateRequest);
    }
}
