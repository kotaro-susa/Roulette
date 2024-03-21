import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class BetServiceUserLogic {
  constructor(private readonly UserRepository: UserRepository) {}

  // ユーザーIDを受け取り、バンクロールを返す
  async getUserBankroll(id: string): Promise<number> {
    const user = await this.UserRepository.findOne({ id: id });
    return user.bankroll;
  }

  //   賭け結果を受け取り、ユーザーのバンクロールとtotalWinLossAmountを更新する
  async updateUserInfo(
    payouts: {
      result: { number: number; color: string };
      userid: string;
      bet: number;
      payment: number;
    }[],
  ): Promise<User> {
    const user = await this.UserRepository.findOne({ id: payouts[0].userid });
    console.log('変更前', user);
    // 総ベット額を計算
    const allBet = payouts.reduce((total, payout) => total + payout.bet, 0);
    // 払い戻し金額を計算
    const allPayment = payouts.reduce(
      (total, payout) => total + payout.payment,
      0,
    );
    // ユーザーの所持金=現在の所持金-ベット額+払い戻し
    user.bankroll = user.bankroll - allBet + allPayment;
    // 入金額に対して、どれくらい勝っているor負けているのか
    user.totalWinLossAmount = user.bankroll - user.chipsPurchased;
    console.log('変更後', user);
    await this.UserRepository.save(user);
    return user;
  }
}
