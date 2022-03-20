import { UsersEntity } from './../users/users.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from './../shared/helpers/auth.guard';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CageService } from './cage.service';
import { CageEntity } from './cage.entity';
import { CageInput } from './cage.model';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CageEntity)
export class CageResolver {
  constructor(private readonly cageService: CageService) {}

  @Mutation(() => CageEntity)
  @UseGuards(new AuthGuard())
  async createCage(
    @Args('createCageInput') createCageInput: CageInput
  ): Promise<CageEntity> {
    return this.cageService.create(createCageInput);
  }

  @Query(() => [CageEntity], { name: 'getCages' })
  findAll() {
    return this.cageService.findAll();
  }

  @Query(() => CageEntity, { name: 'getCage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cageService.findOne(id);
  }

  @Mutation(() => Number)
  removeCage(@Args('idOperation', { type: () => Int }) idOperation: number) {
    return this.cageService.remove(idOperation);
  }
}
