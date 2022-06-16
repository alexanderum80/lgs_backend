import { AuthGuard } from './../shared/helpers/auth.guard';
import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { CageService } from './cage.service';
import { CageEntity } from './cage.entity';
import { CageInput, MoneyBreakdown } from './cage.model';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CageEntity)
export class CageResolver {
  constructor(private readonly cageService: CageService) {}

  @Mutation(() => CageEntity)
  @UseGuards(new AuthGuard())
  async createCage(
    @Args('createCageInput') createCageInput: CageInput,
  ): Promise<CageEntity> {
    return this.cageService.create(createCageInput);
  }

  @Query(() => [CageEntity], { name: 'getCages' })
  @UseGuards(new AuthGuard())
  findAll() {
    return this.cageService.findAll();
  }

  @Query(() => CageEntity, { name: 'getCage' })
  @UseGuards(new AuthGuard())
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cageService.findOne(id);
  }

  @Mutation(() => Number)
  @UseGuards(new AuthGuard())
  removeCage(@Args('idOperation', { type: () => Int }) idOperation: number) {
    return this.cageService.remove(idOperation);
  }

  @Query(() => [MoneyBreakdown])
  // @UseGuards(new AuthGuard())
  getMoneyBreakdown(
    @Args('amount', { type: () => Float }) amount: number,
    @Args('idOperation', { type: () => Int }) idOperation: number,
  ) {
    return this.cageService.getMoneyBreakdown(amount, idOperation);
  }
}
