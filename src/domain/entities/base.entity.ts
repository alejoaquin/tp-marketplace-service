import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}
