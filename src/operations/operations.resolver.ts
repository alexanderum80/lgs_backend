import { UsersEntity } from './../users/users.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from './../shared/helpers/auth.guard';
import { OperationInput } from './operations.model';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OperationsService } from './operations.service';
import { OperationsREntity, OperationsDEntity } from './operations.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OperationsREntity)
export class OperationsResolver {
  constructor(private readonly operationsService: OperationsService) {}

  @Query(() => [OperationsREntity], { name: 'getOperations' })
  async findAll(): Promise<OperationsREntity[]> {
    return this.operationsService.findAll();
  }

  @Query(() => [OperationsREntity], { name: 'getOperationsLatest' })
  async findLatest(
    @Args('idState', { type: () => Int }) idState: number 
  ): Promise<OperationsREntity[]> {
    return this.operationsService.findAllLatest(idState);
  }

  @Query(() => OperationsREntity, { name: 'getOperation' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<OperationsREntity> {
    return this.operationsService.findOne(id);
  }

  @Query(() => [OperationsDEntity], { name: 'getOperationDetails' })
  async findDetails(@Args('id', { type: () => Int }) id: number): Promise<OperationsDEntity[]> {
    return this.operationsService.findDetails(id);
  }

  @Mutation(() => OperationsREntity)
  @UseGuards(new AuthGuard())
  async createOperation(
    @Context(DEFAULT_GRAPHQL_CONTEXT) user: UsersEntity,
    @Args('operationInput') operationInput: OperationInput,
  ): Promise<OperationsREntity> {
    return this.operationsService.create(user.Id, operationInput);
  }

  @Mutation(() => OperationsREntity)
  @UseGuards(new AuthGuard())
  async updateOperation(
    @Context(DEFAULT_GRAPHQL_CONTEXT) user: UsersEntity,
    @Args('operationInput') operationInput: OperationInput
  ): Promise<OperationsREntity> {
    return this.operationsService.update(user.Id, operationInput);
  }

  @Mutation(() => Number)
  async deleteOperation(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.operationsService.delete(IDs);
  }
}
