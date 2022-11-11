import { InscriptionStatus } from '../enums';
import { UserBasicInfoDto } from './user.basic.info.dto';

export class InscriptionDto {
    id: string;
    phone: number;
    email: string;
    reason: string;
    timeRangeFrom: string;
    timeRangeTo: string;
    student: UserBasicInfoDto;
    status: InscriptionStatus;
}
