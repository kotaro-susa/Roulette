import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  // ユーザーリポジトリの注入
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  //   ユーザーの作成
  async signUp(CreateUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(CreateUserDto);
  }

  // ログイン（ユーザー名・パスワードを入力）
  async signIn(
    CredentialsDto: CredentialsDto,
  ): Promise<{ access_token: string }> {
    // CredentialsDtからユーザー名とパスワードを受け取る
    const { userName, password } = CredentialsDto;
    try {
      const user = await this.userRepository.findOne({ userName });
      // ユーザーから受け取った平文PWとDB内に保管されたPWを比較
      if (user && (await bcrypt.compare(password, user.password))) {
        // ペイロードを作成
        const payload = {
          id: user.id,
          userName: userName,
          bankroll: user.bankroll,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return { access_token: access_token };
        // JWTトークンを生成
      } else {
        throw new UnauthorizedException(
          'ユーザー名またはパスワードを確認してください',
        );
      }
    } catch (error) {
      throw new UnauthorizedException(
        'ユーザー名またはパスワードを確認してください',
      );
    }
  }
}
