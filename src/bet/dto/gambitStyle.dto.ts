import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class gambitStyle {
  @IsString()
  @IsNotEmpty()
  color: string;
  @IsNumber()
  @IsNotEmpty()
  number: number;
}
