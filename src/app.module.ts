import { Module } from '@nestjs/common';
import { BetModule } from './bet/bet.module';


@Module({
  imports: [BetModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
