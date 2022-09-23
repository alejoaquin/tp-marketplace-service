import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './configuration/data-source';
import { AppController } from './controllers/app.controller';
import {
    CommentEntity,
    CourseEntity,
    CourseRequestEntity,
    EducationEntity,
    NotificationEntity,
    ProfessorEntity,
    ScoringEntity,
    StudentEntity,
    UserEntity,
} from './domain';
import { AppService } from './use-cases/app.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([
            CommentEntity,
            CourseEntity,
            CourseRequestEntity,
            EducationEntity,
            NotificationEntity,
            ProfessorEntity,
            ScoringEntity,
            StudentEntity,
            UserEntity,
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
