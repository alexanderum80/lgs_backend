import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoinsService } from './coins.service';
import { CoinEntity } from './coins.entity';
import { CoinInput } from './coins.model';

@Resolver(() => CoinEntity)
export class CoinsResolver {
  constructor(private readonly coinsService: CoinsService) {}

  @Query(() => [CoinEntity], { name: 'getCoins' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<CoinEntity[]> {
    return this.coinsService.findAll();
  }

  @Query(() => CoinEntity, { name: 'getCoin' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<CoinEntity> {
    return this.coinsService.findOne(id);
  }

  @Mutation(() => CoinEntity)
  @UseGuards(new AuthGuard())
  createCoin(@Args('coinInput') coinInput: CoinInput): Promise<CoinEntity> {
    return this.coinsService.create(coinInput);
  }

  @Mutation(() => CoinEntity)
  @UseGuards(new AuthGuard())
  updateCoin(@Args('coinInput') coinInput: CoinInput): Promise<CoinEntity> {
    return this.coinsService.update(coinInput);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  deleteCoin(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.coinsService.delete(IDs);
  }
}
