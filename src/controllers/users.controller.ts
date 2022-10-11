import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from 'src/domain';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Post()
    create(@Body() user: UserDto) {
        return this.usersService.create(user);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
