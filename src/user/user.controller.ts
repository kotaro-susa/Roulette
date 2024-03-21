import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Deposit } from './dto/deposit.dto';
import { GetUserInfo } from './decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  // ユーザーの新規登録
  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return await this.UserService.signUp(CreateUserDto);
  }

  // ユーザーログイン
  @Post('signin')
  async signin(
    @Body() CredentialsDto: CredentialsDto,
  ): Promise<{ access_token: string }> {
    return await this.UserService.signIn(CredentialsDto);
  }
  // 入金作業
  // メタデータからユーザー情報を取得
  @Post('deposit')
  @UseGuards(AuthGuard('jwt'))
  async deposit(@Body() deposit: Deposit, @GetUserInfo() user: User) {
    return await this.UserService.deposit(deposit, user.id);
  }
}
