import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProfessorsModule } from './professors/professors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), StudentsModule, ProfessorsModule, CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
