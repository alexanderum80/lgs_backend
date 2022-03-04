import { TableGameInput } from './tables-game.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TablesGameService } from './tables-game.service';
import { TablesGameEntity } from './tables-game.entity';

@Resolver(() => TablesGameEntity)
export class TablesGameResolver {
  constructor(private readonly TablesGameService: TablesGameService) {}

  @Query(() => [TablesGameEntity], { name: 'getTablesGame' })
  async findAll(): Promise<TablesGameEntity[]> {
    return this.TablesGameService.findAll();
  }

  @Query(() => TablesGameEntity, { name: 'getTableGame' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<TablesGameEntity> {
    return this.TablesGameService.findOne(id);
  }

  @Mutation(() => TablesGameEntity)
  async createTableGame(@Args('TableGameInput') TableGameInput: TableGameInput): Promise<TablesGameEntity> {
    return this.TablesGameService.create(TableGameInput);
  }

  @Mutation(() => TablesGameEntity)
  async updateTableGame(@Args('TableGameInput') TableGameInput: TableGameInput): Promise<TablesGameEntity> {
    return this.TablesGameService.update(TableGameInput);
  }

  @Mutation(() => Number)
  async deleteTableGame(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.TablesGameService.delete(IDs);
  }
}
