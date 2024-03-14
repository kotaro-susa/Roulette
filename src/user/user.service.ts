import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  // ユーザーリポジトリの注入
  constructor(private readonly userRepository: UserRepository) {}

  //   ユーザーの作成
  async signUp(CreateUserDto: CreateUserDto) :Promise<User>{
    return await this.userRepository.createUser(CreateUserDto)
  }
}
