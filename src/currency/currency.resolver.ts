import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { CurrencyEntity } from './currency.entity';
import { CurrencyInput } from './currency.model';

@Resolver(() => CurrencyEntity)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => [CurrencyEntity], { name: 'getCurrencies' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<CurrencyEntity[]> {
    return this.currencyService.findAll();
  }

  @Query(() => CurrencyEntity, { name: 'getCurrency' })
  @UseGuards(new AuthGuard())
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CurrencyEntity> {
    return this.currencyService.findOne(id);
  }

  @Mutation(() => CurrencyEntity)
  @UseGuards(new AuthGuard())
  createCurrency(
    @Args('currencyInput') currencyInput: CurrencyInput,
  ): Promise<CurrencyEntity> {
    return this.currencyService.create(currencyInput);
  }

  @Mutation(() => CurrencyEntity)
  @UseGuards(new AuthGuard())
  updateCurrency(
    @Args('currencyInput') currencyInput: CurrencyInput,
  ): Promise<CurrencyEntity> {
    return this.currencyService.update(currencyInput);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  deleteCurrency(
    @Args('IDs', { type: () => [Int] }) IDs: number[],
  ): Promise<number> {
    return this.currencyService.delete(IDs);
  }
}
