import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthModule } from './services/auth/auth.module';
import { CommentsModule } from './services/comments/comments.module';
import { CoursesModule } from './services/courses/courses.module';
import { InscriptionsModule } from './services/inscriptions/inscriptions.module';
import { MailModule } from './services/mail/mail.module';
import { NotificationsModule } from './services/notifications/notifications.module';
import { RatingsModule } from './services/ratings/ratings.module';
import { StudentsModule } from './services/students/students.module';
import { TeachersModule } from './services/teacher/teachers.module';
import { TokenModule } from './services/token/token.module';
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
        NotificationsModule,
        UsersModule,
        CoursesModule,
        CommentsModule,
        InscriptionsModule,
        RatingsModule,
        MailModule,
        TokenModule,
        AuthModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
