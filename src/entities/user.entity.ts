import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  // 所持チップ数
  @Column()
  bankroll: number;

  // 購入チップ数
  @Column()
  ChipsPurchased: number;

  //   累計の勝ち/負け 金額
  @Column()
  totalWinLossAmount: number;
}
