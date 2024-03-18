import { Payment } from 'src/entities/payment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
  async createPayment(
    // 賭けの結果を配列で受け取る
    payments: { userid: string; payment: number }[],
  ): Promise<Payment[]> {
    const result = payments.map(async (payment) => {
      const data = this.create({
        userId: payment.userid,
        payment: payment.payment,
      });
      return await this.save(data);
    });

    return Promise.all(result);
  }
}
