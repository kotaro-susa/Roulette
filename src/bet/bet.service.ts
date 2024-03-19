import { Injectable } from '@nestjs/common';
import {
  betOnSingleNumber,
  calculateColorpayout,
  calculateEvenOddpayout,
  generateRandomRouletteResult,
} from './bettingLogic';
import { Payment } from 'src/entities/payment.entity';
import { PaymentRepository } from './payment.repository';
// 賭けのロジックに関することのみ記述
// ユーザーの資金面に関わるところは【】に記述
@Injectable()
export class BetService {
  // クラスを呼び出した時に実装される処理
  constructor(private readonly PaymentRepository: PaymentRepository) {}

  // 乱数を生成し、ボールが入る場所を確定
  generateRandomRouletteResult = (): {
    number: number;
    color: string;
  } => {
    const LuckyNumber = generateRandomRouletteResult();
    return LuckyNumber;
  };

  //   ユーザーの賭けた色と金額、ボールが入った場所の色を受け取り、リターンを計算
  calculateColorpayout = (
    color: string,
    stakes: number,
    LuckeyColor: string,
  ): number => {
    return calculateColorpayout(color, stakes, LuckeyColor);
  };
  // 奇数か偶数かに応じて、リターンを計算
  calculateEvenOddpayout = (
    number: number,
    stakes: number,
    LuckeyNumber: number,
  ): number => {
    return calculateEvenOddpayout(number, stakes, LuckeyNumber);
  };

  //   数字の一点賭けを計算
  calculateSingleNumberpayout = (
    number: number,
    stakes: number,
    LuckeyNumber: number,
  ): number => {
    return betOnSingleNumber(number, stakes, LuckeyNumber);
  };

  // 賭け結果をDBに保存する
  savePayment = async (
    payment: { userid: string; bet: number; payment: number }[],
  ): Promise<Payment[]> => {
    return await this.PaymentRepository.createPayment(payment);
  };
}
