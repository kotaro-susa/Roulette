import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GambitStyle } from './dto/gambitStyle.dto';
import { BetService } from './bet.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUserInfo } from 'src/user/decorator/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { BetServiceUserLogic } from './bet.serviceUserLogic';

// 賭け方は【色】×【数字】で決まる

// ユーザーがどこに賭けたのかを受け取る
@Controller('bet')
export class BetController {
  // コントローラー内にベットサービスを使えるようにする
  constructor(
    private readonly BetService: BetService,
    private readonly BetServiceUserLogic: BetServiceUserLogic,
  ) {}
  // 乱数を保持する変数を生成（色と数値を受け取る）
  private cachedRandomNumber: {
    number: number;
    color: string;
  };

  // 生成された乱数と賭け情報を受け取り、判定ロジックに渡す
  // 複数の賭け情報が配列で渡されるので、1つづ取り出して、ロジックを実行
  @Post('placement')
  @UseGuards(AuthGuard('jwt'))
  async getBet(@Body() gambitStyles: GambitStyle[], @GetUserInfo() user: User) {
    // 乱数を生成
    this.cachedRandomNumber = this.BetService.generateRandomRouletteResult();
    // 【賭け金額>バンクロール】の場合はエラーを返す処理を記述
    // 1:渡された賭け金額を合計
    const allStakes = gambitStyles.reduce(
      (total, obj) => total + obj.stakes,
      0,
    );

    if (allStakes > (await this.BetServiceUserLogic.getUserBankroll(user.id))) {
      throw new UnauthorizedException('賭け金額が所持金額を超えています');
    }

    const payouts = gambitStyles.map((gambitStyle) => {
      // 色賭け
      let payment: number;
      if (gambitStyle.type === 'ColorBet') {
        payment = this.BetService.calculateColorpayout(
          gambitStyle.color,
          gambitStyle.stakes,
          this.cachedRandomNumber.color,
        );
      }
      // 偶数か奇数か
      else if (gambitStyle.type === 'EvenOddBet') {
        payment = this.BetService.calculateEvenOddpayout(
          gambitStyle.number,
          gambitStyle.stakes,
          this.cachedRandomNumber.number,
        );
      } else if (gambitStyle.type === 'SingleNumberBet') {
        payment = this.BetService.calculateSingleNumberpayout(
          gambitStyle.number,
          gambitStyle.stakes,
          this.cachedRandomNumber.number,
        );
      }

      return {
        result: this.cachedRandomNumber,
        userid: user.id,
        bet: gambitStyle.stakes,
        payment: payment,
      };
    });
    // ユーザーの賭け情報をDBに保存
    await this.BetService.savePayment(payouts);
    
    const userData = async (
      payouts: {
        result: { number: number; color: string };
        userid: string;
        bet: number;
        payment: number;
      }[],
    ): Promise<User> => {
      return await this.BetServiceUserLogic.updateUserInfo(payouts);
    };
    return { userdata: await userData(payouts), results: payouts };
  }
}
