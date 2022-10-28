import { InscriptionStatus } from '../enums';

export class UpdateInscriptionRequest {
    phone: number;
    email: string;
    reason: string;
    timeRangeFrom: string;
    timeRangeTo: string;
    status: InscriptionStatus;
}
