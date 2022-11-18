import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
    NotificationEntity,
    NotificationRequest,
    UserEntity,
} from 'src/domain';
import { UserDto } from 'src/domain/dtos/user.dto';
import { Public } from 'src/public.decorator';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { UsersFactoryService } from 'src/services/users/users-factory.service';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private notificationsService: NotificationsService,
        private usersFactoryService: UsersFactoryService,
    ) {}

    @Get()
    async getAll(): Promise<UserDto[]> {
        const arr = await this.usersService.getAll();
        return Promise.all(arr.map((u) => this.usersFactoryService.toDto(u)));
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<UserDto> {
        const entity = await this.usersService.getById(id);
        return this.usersFactoryService.toDto(entity);
    }

    @Public()
    @Post()
    @HttpCode(201)
    async create(@Body() user: UserEntity): Promise<UserDto> {
        const entity = await this.usersService.create(
            this.usersFactoryService.toEntity(user),
        );
        return this.usersFactoryService.toDto(entity);
    }

    @Get(':id/notifications')
    getNotifications(@Param('id') id: string): Promise<NotificationEntity[]> {
        return this.notificationsService.getAll(id);
    }

    @Post(':id/notifications')
    @HttpCode(201)
    createNotification(
        @Param('id') id: string,
        @Body() notification: NotificationRequest,
    ): Promise<NotificationEntity> {
        return this.notificationsService.create(id, notification);
    }

    @Post(':id/notifications/:notificationId')
    @HttpCode(204)
    reedNotification(@Param('notificationId') id: string): Promise<void> {
        return this.notificationsService.read(id);
    }
}
