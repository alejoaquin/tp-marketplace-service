import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import config from './configuration/data-source';
import { AppController } from './controllers/app.controller';
import { AuthModule } from './services/auth/auth.module';
import { JwtAuthGuard } from './services/auth/jwt-auth.guard';
import { CommentsModule } from './services/comments/comments.module';
import { CoursesModule } from './services/courses/courses.module';
import { InscriptionsModule } from './services/inscriptions/inscriptions.module';
import { StudentsModule } from './services/students/students.module';
import { TeachersModule } from './services/teacher/teachers.module';
import { UsersModule } from './services/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(config),
        StudentsModule,
        TeachersModule,
        UsersModule,
        CoursesModule,
        CommentsModule,
        InscriptionsModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
