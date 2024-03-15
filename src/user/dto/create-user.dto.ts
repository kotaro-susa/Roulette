import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
// ユーザー作成時のバリデーションを実装
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string;

  @IsNumber()
  bankroll: number;
}
