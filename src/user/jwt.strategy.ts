// ユーザーがアクセスした時にJWTトークンを受け取る処理を記述する

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserRepository: UserRepository) {
    super({
      secretOrKey: 'secretKey123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  // リクエストからペイロードを受け取る
  async validate(payload: { id: string; userName: string }): Promise<User> {
    // 該当のユーザーを探す
    const { id, userName } = payload;
    const user = await this.UserRepository.findOne({ id, userName });
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
