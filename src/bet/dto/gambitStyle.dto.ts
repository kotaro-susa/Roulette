import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
// フロントから、渡されるデータについて
export class GambitStyle {

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  stakes: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
