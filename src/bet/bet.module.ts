import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { PaymentRepository } from './payment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetServiceUserLogic } from './bet.serviceUserLogic';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentRepository, UserRepository])],
  controllers: [BetController],
  providers: [BetService, BetServiceUserLogic],
})
export class BetModule {}
