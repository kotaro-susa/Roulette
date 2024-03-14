import { Injectable } from '@nestjs/common';
import {
  betOnSingleNumber,
  calculateColorpayout,
  calculateEvenOddpayout,
  generateRandomRouletteResult,
} from './bettingLogic';

@Injectable()
export class BetService {
  // クラスを呼び出した時に実装される処理
  //   constructor() {}

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
}
