import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { GambitStyle } from './dto/gambitStyle.dto';
import { BetService } from './bet.service';

// 賭け方は【色】×【数字】で決まる

// ユーザーがどこに賭けたのかを受け取る
@Controller('bet')
export class BetController {
  // コントローラー内にベットサービスを使えるようにする
  constructor(private readonly BetService: BetService) {}
  // 乱数を保持する変数を生成（色と数値を受け取る）
  private cachedRandomNumber: {
    number: number;
    color: string;
  };
  // 賭けられる時間が終了したことを受け取り、乱数を生成する
  @Get('placement')
  getRandomNumber(): {
    number: number;
    color: string;
  } {
    this.cachedRandomNumber = this.BetService.generateRandomRouletteResult();
    return this.cachedRandomNumber;
  }

  // 生成された乱数と賭け情報を受け取り、判定ロジックに渡す
  // 複数の賭け情報が配列で渡されるので、1つづ取り出して、ロジックを実行
  @Post('placement')
  getBet(@Body() gambitStyles: GambitStyle[]) {
    const payouts = gambitStyles.map((gambitStyle) => {
      // 色賭け
      if (gambitStyle.type === 'ColorBet') {
        return {
          id: 'id1',
          payment: this.BetService.calculateColorpayout(
            gambitStyle.color,
            gambitStyle.stakes,
            this.cachedRandomNumber.color,
          ),
        };
      }
      // 偶数か奇数か
      else if (gambitStyle.type === 'EvenOddBet') {
        return {
          id: 'id2',
          payment: this.BetService.calculateEvenOddpayout(
            gambitStyle.number,
            gambitStyle.stakes,
            this.cachedRandomNumber.number,
          ),
        };
      } else if (gambitStyle.type === 'SingleNumberBet') {
        return {
          id: 'id3',
          payment: this.BetService.calculateSingleNumberpayout(
            gambitStyle.number,
            gambitStyle.stakes,
            this.cachedRandomNumber.number,
          ),
        };
      }
      return '他の賭け';
    });
    return payouts;
  }
}
