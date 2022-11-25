import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TokenEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    token: string;

    @Column()
    expireAt: string;
}
