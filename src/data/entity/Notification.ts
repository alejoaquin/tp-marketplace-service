import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity()
export class Notification extends BaseEntity {
  @Column()
  source: string;

  @Column()
  sourceType: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
