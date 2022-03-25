import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentsService } from './payments.service';
import { PaymentsEntity, PaymentsView } from './payments.entity';
import { PaymentInput } from './payments.model';

@Resolver(() => PaymentsEntity)
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => PaymentsEntity)
  @UseGuards(new AuthGuard())
  createPayment(@Args('paymentInput') paymentInput: PaymentInput) {
    return this.paymentsService.create(paymentInput);
  }

  @Query(() => [PaymentsView], { name: 'getPayments' })
  @UseGuards(new AuthGuard())
  findAll() {
    return this.paymentsService.findAll();
  }

  @Query(() => PaymentsEntity, { name: 'getPayment' })
  @UseGuards(new AuthGuard())
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentsService.findOne(id);
  }

  @Mutation(() => PaymentsEntity)
  @UseGuards(new AuthGuard())
  updatePayment(@Args('paymentInput') paymentInput: PaymentInput) {
    return this.paymentsService.update(paymentInput);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  removePayment(@Args('IDs', { type: () => [Int] }) IDs: number[]) {
    return this.paymentsService.remove(IDs);
  }
}
