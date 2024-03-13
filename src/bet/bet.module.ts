import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';

@Module({
  controllers: [BetController],
})
export class BetModule {}
