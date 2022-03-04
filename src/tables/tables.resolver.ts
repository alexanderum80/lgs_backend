import { TableInput } from './tables.models';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TablesService } from './tables.service';
import { TablesEntity } from './tables.entity';

@Resolver(() => TablesEntity)
export class TablesResolver {
  constructor(private readonly tablesService: TablesService) {}

  @Query(() => [TablesEntity], { name: 'getTables' })
  async findAll(): Promise<TablesEntity[]> {
    return this.tablesService.findAll();
  }

  @Query(() => TablesEntity, { name: 'getTable' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<TablesEntity> {
    return this.tablesService.findOne(id);
  }

  @Mutation(() => TablesEntity)
  async createTable(@Args('tableInput') tableInput: TableInput): Promise<TablesEntity> {
    return this.tablesService.create(tableInput);
  }
  
  @Mutation(() => TablesEntity)
  async updateTable(@Args('tableInput') tableInput: TableInput): Promise<TablesEntity> {
    return this.tablesService.update(tableInput);
  }

  @Mutation(() => Number)
  async deleteTable(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.tablesService.delete(IDs);
  }
}
