import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

// ログイン時のバリデーションを実装
export class CredentialsDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(8)
  password: string;
}
