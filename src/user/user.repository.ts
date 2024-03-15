import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { userName, password, bankroll } = CreateUserDto;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    // ユーザーを作成した段階では所持チップ数=購入チップ数
    const user = this.create({
      userName,
      password: hashPassword,
      bankroll,
      ChipsPurchased: bankroll,
      totalWinLossAmount: 0,
    });

    await this.save(user);

    return user;
  }
}
