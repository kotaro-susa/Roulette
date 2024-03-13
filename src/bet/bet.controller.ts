import { Body, Controller, Post } from '@nestjs/common';
import { gambitStyle } from './dto/gambitStyle.dto';

// 賭け方は【色】×【数字】で決まる

// ユーザーがどこに賭けたのかを受け取る
@Controller('bet')
export class BetController {
  @Post('placement')
  getBet(@Body() gambitStyle: gambitStyle[]) {
    const color = gambitStyle[1].color;
    const number = gambitStyle[1].number;
    return color + number;
  }
}
