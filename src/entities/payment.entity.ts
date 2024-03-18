import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  payment: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
