import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentRepository])],
  controllers: [BetController],
  providers: [BetService],
})
export class BetModule {}
