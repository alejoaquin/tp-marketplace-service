import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import {
    NotificationEntity,
    NotificationRequest,
    UserEntity,
} from 'src/domain';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private notificationsService: NotificationsService,
    ) {}

    @Get()
    getAll(): Promise<UserEntity[]> {
        return this.usersService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string): Promise<UserEntity> {
        return this.usersService.getById(id);
    }

    @Post()
    @HttpCode(201)
    create(@Body() user: UserEntity): Promise<UserEntity> {
        return this.usersService.create(user);
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
