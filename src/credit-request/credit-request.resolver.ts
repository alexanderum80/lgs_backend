import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CreditRequestService } from './credit-request.service';
import { CreditRequestEntity } from './credit-request.entity';

@Resolver(() => CreditRequestEntity)
export class CreditRequestResolver {
  constructor(private readonly creditRequestService: CreditRequestService) {}

  @Query(() => [CreditRequestEntity], { name: 'creditsRequest' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<CreditRequestEntity[]> {
    return this.creditRequestService.findAll();
  }

  @Query(() => [CreditRequestEntity], { name: 'pendingCreditsRequest' })
  @UseGuards(new AuthGuard())
  async findAllPending(): Promise<CreditRequestEntity[]> {
    return this.creditRequestService.findAllPending();
  }

  @Query(() => CreditRequestEntity, { name: 'creditRequest' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<CreditRequestEntity> {
    return this.creditRequestService.findOne(id);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  async approveCreditRequest(
    @Args({name: 'idCredit', type: () => Int }) idCredit: number
  ): Promise<number> {
    return this.creditRequestService.approve(idCredit);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  async denyCreditRequest(
    @Args({name: 'idCredit', type: () => Int }) idCredit: number
  ): Promise<number> {
    return this.creditRequestService.deny(idCredit);
  }
}
