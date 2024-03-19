import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  // 賭け金額
  @Column()
  bet: number;
  // 払い戻し金額
  @Column()
  payment: number;
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
