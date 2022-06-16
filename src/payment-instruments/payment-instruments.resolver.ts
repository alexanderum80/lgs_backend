import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PaymentInstrumentsService } from './payment-instruments.service';
import { PaymentInstrumentsEntity } from './payment-instruments.entity';

@Resolver(() => PaymentInstrumentsEntity)
export class PaymentInstrumentsResolver {
  constructor(
    private readonly paymentInstrumentsService: PaymentInstrumentsService,
  ) {}

  @Query(() => [PaymentInstrumentsEntity], { name: 'getPaymentInstruments' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<PaymentInstrumentsEntity[]> {
    return this.paymentInstrumentsService.findAll();
  }

  @Query(() => PaymentInstrumentsEntity, { name: 'getPaymentInstrument' })
  @UseGuards(new AuthGuard())
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PaymentInstrumentsEntity> {
    return this.paymentInstrumentsService.findOne(id);
  }

  // @Mutation(() => PaymentInstrumentsEntity)
  // createPaymentInstrument(@Args('createPaymentInstrumentInput') createPaymentInstrumentInput: CreatePaymentInstrumentInput) {
  //   return this.paymentInstrumentsService.create(createPaymentInstrumentInput);
  // }

  // @Mutation(() => PaymentInstrumentsEntity)
  // updatePaymentInstrument(@Args('updatePaymentInstrumentInput') updatePaymentInstrumentInput: UpdatePaymentInstrumentInput) {
  //   return this.paymentInstrumentsService.update(updatePaymentInstrumentInput.id, updatePaymentInstrumentInput);
  // }

  // @Mutation(() => PaymentInstrumentsEntity)
  // removePaymentInstrument(@Args('id', { type: () => Int }) id: number) {
  //   return this.paymentInstrumentsService.remove(id);
  // }
}
