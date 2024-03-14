import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { userName, password, bankroll } = CreateUserDto;
    // パスワードのハッシュ化はあとでする
    // ユーザーを作成した段階では所持チップ数=購入チップ数
    const user = this.create({
      userName,
      password,
      bankroll,
      ChipsPurchased: bankroll,
      totalWinLossAmount: 0,
    });

    await this.save(user);

    return user;
  }
}
