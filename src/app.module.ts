import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
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
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                username: configService.get<string>('DATABASE_USERNAME'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                port: configService.get<number>('DATABASE_PORT'),
                migrationsTableName: 'migrations',
                synchronize: true,
                logging: false,
                entities: ['dist/domain/entities/*.entity.{ts,js}'],
                migrations: ['dist/domain/migration/*.js'],
                subscribers: ['dist/domain/subscriber/*.js'],
            }),
            inject: [ConfigService],
        }),
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
