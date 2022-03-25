import { UsersEntity } from './../users/users.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TableInput } from './tables.models';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TablesService } from './tables.service';
import { TablesEntity, TablesInitValuesEntity } from './tables.entity';

@Resolver(() => TablesEntity)
export class TablesResolver {
  constructor(private readonly tablesService: TablesService) {}

  @Query(() => [TablesEntity], { name: 'getTables' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<TablesEntity[]> {
    return this.tablesService.findAll();
  }

  @Query(() => [TablesEntity], { name: 'getTablesWithInitValues' })
  @UseGuards(new AuthGuard())
  async findAllWithInitValues(): Promise<TablesEntity[]> {
    return this.tablesService.findAllWithInitValues();
  }

  @Query(() => [TablesInitValuesEntity], { name: 'getTableInitValues' })
  @UseGuards(new AuthGuard())
  async findInitialValues(@Args({ name: 'idTable', type: () => Int }) idTable: number): Promise<TablesInitValuesEntity[]> {
    return this.tablesService.findInitialValues(idTable);
  }

  @Query(() => TablesEntity, { name: 'getTable' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<TablesEntity> {
    return this.tablesService.findOne(id);
  }

  @Mutation(() => TablesEntity)
  @UseGuards(new AuthGuard())
  async createTable(
    @Context(DEFAULT_GRAPHQL_CONTEXT) user: UsersEntity,
    @Args('tableInput') tableInput: TableInput
  ): Promise<TablesEntity> {
    return this.tablesService.create(user, tableInput);
  }
  
  @Mutation(() => TablesEntity)
  @UseGuards(new AuthGuard())
  async updateTable(
    @Context(DEFAULT_GRAPHQL_CONTEXT) user: UsersEntity,
    @Args('tableInput') tableInput: TableInput
  ): Promise<TablesEntity> {
    return this.tablesService.update(user, tableInput);
  }

  @Mutation(() => Number)
  @UseGuards(new AuthGuard())
  async deleteTable(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.tablesService.delete(IDs);
  }
}
