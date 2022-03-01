import { LenderInput } from './lenders.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LendersService } from './lenders.service';
import { LendersEntity } from './lenders.entity';

@Resolver(() => LendersEntity)
export class LendersResolver {
  constructor(private readonly lendersService: LendersService) {}

  @Query(() => [LendersEntity], { name: 'getLenders' })
  findAll() {
    return this.lendersService.findAll();
  }

  @Query(() => LendersEntity, { name: 'getLender' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lendersService.findOne(id);
  }

  @Mutation(() => LendersEntity)
  createLender(@Args('lenderInput') lenderInput: LenderInput) {
    return this.lendersService.create(lenderInput);
  }

  @Mutation(() => LendersEntity)
  updateLender(@Args('lenderInput') lenderInput: LenderInput) {
    return this.lendersService.update(lenderInput);
  }

  @Mutation(() => Number)
  deleteLender(@Args('IDs', { type: () => [Int] }) IDs: number[]) {
    return this.lendersService.delete(IDs);
  }
}
