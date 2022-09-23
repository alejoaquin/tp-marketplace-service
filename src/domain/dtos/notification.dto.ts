import { UserDto } from './user.abstract.dto';

export class NotificationDto {
    id: string;

    source: string;

    sourceType: string;

    description: string;

    user: UserDto;
}
