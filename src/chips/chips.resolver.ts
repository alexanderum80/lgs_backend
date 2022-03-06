import { ChipInput } from './chips.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChipsService } from './chips.service';
import { ChipsEntity } from './chips.entity';

@Resolver(() => ChipsEntity)
export class ChipsResolver {
  constructor(private readonly chipsService: ChipsService) {}

  @Query(() => [ChipsEntity], { name: 'getChips' })
  async findAll(): Promise<ChipsEntity[]> {
    return this.chipsService.findAll();
  }

  @Query(() => ChipsEntity, { name: 'getChip' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<ChipsEntity> {
    return this.chipsService.findOne(id);
  }

  @Mutation(() => ChipsEntity)
  async createChip(@Args('chipInput') chipInput: ChipInput): Promise<ChipsEntity> {
    return this.chipsService.create(chipInput);
  }
  
  @Mutation(() => ChipsEntity)
  async updateChip(@Args('chipInput') chipInput: ChipInput): Promise<ChipsEntity> {
    return this.chipsService.update(chipInput);
  }

  @Mutation(() => ChipsEntity)
  async deleteChip(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.chipsService.remove(IDs);
  }
}
