import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentsEntity, PaymentsView } from './payments.entity';
import { PaymentInput } from './payments.model';

@Resolver(() => PaymentsEntity)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => PaymentsEntity)
  createPayment(@Args('paymentInput') paymentInput: PaymentInput) {
    return this.paymentsService.create(paymentInput);
  }

  @Query(() => [PaymentsView], { name: 'getPayments' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Query(() => PaymentsEntity, { name: 'getPayment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Mutation(() => PaymentsEntity)
  updatePayment(@Args('paymentInput') paymentInput: PaymentInput) {
    return this.paymentsService.update(paymentInput);
  }

  @Mutation(() => PaymentsEntity)
  removePayment(@Args('IDs', { type: () => [Int] }) IDs: number[]) {
    return this.paymentsService.remove(IDs);
  }
}
