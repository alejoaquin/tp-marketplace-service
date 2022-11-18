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
    RatingDto,
    UpdateInscriptionRequest,
} from 'src/domain';
import { Public } from 'src/public.decorator';
import { CommentsFactoryService } from 'src/services/comments/comments.factory.service';
import { CommentsService } from 'src/services/comments/comments.service';
import { CoursesFactoryService } from 'src/services/courses/courses.factory.service';
import { CoursesService } from 'src/services/courses/courses.service';
import { InscriptionsFactoryService } from 'src/services/inscriptions/inscriptions.factory.service';
import { InscriptionsService } from 'src/services/inscriptions/inscriptions.service';
import { RatingsFactoryService } from 'src/services/ratings/ratings-factory.service';
import { RatingsService } from 'src/services/ratings/ratings.service';
import { StudentsService } from 'src/services/students/students.service';
import { TeachersService } from 'src/services/teacher/teachers.service';

@Controller('courses')
export class CoursesController {
    constructor(
        private coursesService: CoursesService,
        private commentsService: CommentsService,
        private inscriptionsService: InscriptionsService,
        private studentService: StudentsService,
        private teacherService: TeachersService,
        private ratingsService: RatingsService,
        private inscriptionsFactoryService: InscriptionsFactoryService,
        private commentsFactoryService: CommentsFactoryService,
        private coursesFactoryService: CoursesFactoryService,
        private ratingsFactoryService: RatingsFactoryService,
    ) {}

    @Public()
    @Get()
    async getPublished(): Promise<CourseDto[]> {
        const arr = await this.coursesService.getPublished();
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, true)),
        );
    }

    @Post()
    @HttpCode(201)
    async create(@Body() course: CourseRequest): Promise<CourseDto> {
        const entity = this.coursesFactoryService.requestToEntity(course);
        entity.teacher = this.teacherService.getById(course.teacherId);

        return this.coursesFactoryService.toDto(
            await this.coursesService.create(entity),
            false,
        );
    }

    @Public()
    @Post('search')
    @HttpCode(200)
    async search(
        @Body() searchRequest: CourseSearchRequest,
    ): Promise<CourseDto[]> {
        const arr = await this.coursesService.search(searchRequest);
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, true)),
        );
    }

    @Public()
    @Get(':id')
    async getById(@Param('id') id: string): Promise<CourseDto> {
        const entity = await this.coursesService.getById(id);
        return this.coursesFactoryService.toDto(entity, false);
    }

    @Get('by-teacher/:id')
    async getByTeacher(@Param('id') id: string): Promise<CourseDto[]> {
        const arr = await this.coursesService.getByTeacher(id);
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, false)),
        );
    }

    @Get('by-student/:id')
    async getByStudent(@Param('id') id: string): Promise<CourseDto[]> {
        const arr = await this.coursesService.getByStudent(id);
        return Promise.all(
            arr.map((ac) => this.coursesFactoryService.toDto(ac, true)),
        );
    }

    @Put(':id')
    @HttpCode(200)
    async update(
        @Param('id') id: string,
        @Body() request: CourseRequest,
    ): Promise<void> {
        const entity = this.coursesFactoryService.requestToEntity(request);
        entity.id = id;
        return this.coursesService.update(entity); // TODO: check if this works
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string): Promise<void> {
        return this.coursesService.delete(id);
    }

    @Post(':id/inscriptions')
    @HttpCode(201)
    async enroll(
        @Param('id') id: string,
        @Body() request: EnrollRequest,
    ): Promise<InscriptionDto> {
        const entity = await this.inscriptionsFactoryService.enrollToEntity(
            request,
        );
        entity.student = this.studentService.getById(request.studentId);
        return this.inscriptionsFactoryService.toDto(
            await this.coursesService.enroll(id, entity),
        );
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
    async comment(
        @Param('id') id: string,
        @Body() request: CommentRequest,
    ): Promise<CommentDto> {
        const entity = await this.commentsFactoryService.requestToEntity(
            request,
        );
        entity.student = this.studentService.getById(request.studentId);
        return this.commentsFactoryService.toDto(
            await this.coursesService.addComment(id, entity),
        );
    }

    @Public()
    @Get(':id/comments')
    async getComments(@Param('id') id: string): Promise<CommentDto[]> {
        const entities = await this.commentsService.getByCourse(id);
        return Promise.all(
            entities.map((entity) => this.commentsFactoryService.toDto(entity)),
        );
    }

    @Get(':id/comments/:commentId')
    async getComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
    ): Promise<CommentDto> {
        return this.commentsFactoryService.toDto(
            await this.commentsService.getByIdAndCourse(commentId, id),
        );
    }

    @Put(':id/comments/:commentId')
    async updateComment(
        @Param('id') id: string,
        @Param('commentId') commentId: string,
        @Body() updateRequest: CommentRequest,
    ): Promise<void> {
        return this.commentsService.update(
            commentId,
            id,
            await this.commentsFactoryService.requestToEntity(updateRequest),
        );
    }

    @Public()
    @Get(':id/ratings')
    async getRatings(@Param('id') id: string): Promise<RatingDto[]> {
        const entities = await this.ratingsService.getByCourse(id);
        return Promise.all(
            entities.map((entity) => this.ratingsFactoryService.toDto(entity)),
        );
    }

    @Get(':id/ratings/:ratingId')
    async getRating(
        @Param('id') id: string,
        @Param('ratingId') commentId: string,
    ): Promise<RatingDto> {
        return this.ratingsFactoryService.toDto(
            await this.ratingsService.getByIdAndCourse(commentId, id),
        );
    }

    @Put(':id/ratings/:ratingId')
    async updateRating(
        @Param('id') id: string,
        @Param('ratingId') commentId: string,
        @Body() rating: RatingDto,
    ): Promise<void> {
        return this.ratingsService.update(
            commentId,
            id,
            await this.ratingsFactoryService.toEntity(rating),
        );
    }
}
