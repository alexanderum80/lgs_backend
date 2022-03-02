import { TableTypeInput } from './tables-type.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TablesTypeService } from './tables-type.service';
import { TablesTypeEntity } from './tables-type.entity';

@Resolver(() => TablesTypeEntity)
export class TablesTypeResolver {
  constructor(private readonly tablesTypeService: TablesTypeService) {}

  @Query(() => [TablesTypeEntity], { name: 'getTablesType' })
  async findAll(): Promise<TablesTypeEntity[]> {
    return this.tablesTypeService.findAll();
  }

  @Query(() => TablesTypeEntity, { name: 'getTableType' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<TablesTypeEntity> {
    return this.tablesTypeService.findOne(id);
  }

  @Mutation(() => TablesTypeEntity)
  async createTableType(@Args('tableTypeInput') tableTypeInput: TableTypeInput): Promise<TablesTypeEntity> {
    return this.tablesTypeService.create(tableTypeInput);
  }

  @Mutation(() => TablesTypeEntity)
  async updateTableType(@Args('tableTypeInput') tableTypeInput: TableTypeInput): Promise<TablesTypeEntity> {
    return this.tablesTypeService.update(tableTypeInput);
  }

  @Mutation(() => Number)
  async deleteTableType(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.tablesTypeService.delete(IDs);
  }
}
