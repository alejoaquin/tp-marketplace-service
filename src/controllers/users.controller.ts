import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
    create(@Body() user: UserEntity): Promise<UserEntity> {
        return this.usersService.create(user);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Get(':id/notifications')
    getNotifications(@Param('id') id: string): Promise<NotificationEntity[]> {
        return this.notificationsService.getAll(id);
    }

    @Post(':id/notifications')
    createNotification(
        @Param('id') id: string,
        @Body() notification: NotificationRequest,
    ): Promise<NotificationEntity> {
        return this.notificationsService.create(id, notification);
    }
}
