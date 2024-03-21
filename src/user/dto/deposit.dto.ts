import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class Deposit {
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  bankroll: number;
}
