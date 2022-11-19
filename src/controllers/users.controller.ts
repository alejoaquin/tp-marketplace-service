import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { NotificationDto, UserDto, UserEntity } from 'src/domain';
import { Public } from 'src/public.decorator';
import { NotificationsFactoryService } from 'src/services/notifications/notifications-factory.service';
import { NotificationsService } from 'src/services/notifications/notifications.service';
import { UsersFactoryService } from 'src/services/users/users-factory.service';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private notificationsService: NotificationsService,
        private usersFactoryService: UsersFactoryService,
        private notificationsFactoryService: NotificationsFactoryService,
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
    async getNotifications(
        @Param('id') id: string,
    ): Promise<NotificationDto[]> {
        const arr = await this.notificationsService.getAll(id);
        return Promise.all(
            arr.map((n) => this.notificationsFactoryService.toDto(n)),
        );
    }

    @Post(':id/notifications/:notificationId')
    @HttpCode(200)
    async reedNotification(
        @Param('notificationId') id: string,
    ): Promise<NotificationDto> {
        const entity = await this.notificationsService.read(id);
        return this.notificationsFactoryService.toDto(entity);
    }
}
