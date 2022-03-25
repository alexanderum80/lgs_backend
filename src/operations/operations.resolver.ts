import { UsersEntity } from './../users/users.entity';
import { AuthGuard, DEFAULT_GRAPHQL_CONTEXT } from './../shared/helpers/auth.guard';
import { OperationInput } from './operations.model';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OperationsService } from './operations.service';
import { OperationsREntity, OperationsDEntity, OperationsRView } from './operations.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OperationsREntity)
export class OperationsResolver {
  constructor(private readonly operationsService: OperationsService) {}

  @Query(() => [OperationsREntity], { name: 'getOperations' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<OperationsREntity[]> {
    return this.operationsService.findAll();
  }

  @Query(() => [OperationsRView], { name: 'getOperationsToday' })
  @UseGuards(new AuthGuard())
  async findToday(
    @Args('idState', { type: () => Int }) idState: number 
  ): Promise<OperationsRView[]> {
    return this.operationsService.findAllToday(idState);
  }

  @Query(() => OperationsREntity, { name: 'getOperation' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<OperationsREntity> {
    return this.operationsService.findOne(id);
  }

  @Query(() => [OperationsDEntity], { name: 'getOperationDetails' })
  @UseGuards(new AuthGuard())
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

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  async finishOperation(
    @Args({ name: 'idOperation', type: () => Int }) idOperation: number
  ): Promise<number> {
    return this.operationsService.finishOperation(idOperation);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  async cancelOperation(
    @Args({ name: 'idOperation', type: () => Int }) idOperation: number
  ): Promise<number> {
    return this.operationsService.cancelOperation(idOperation);
  }

  @Mutation(() => Number)
  @UseGuards(new AuthGuard())
  async deleteOperation(@Args('IDs', { type: () => [Int] }) IDs: number[]): Promise<number> {
    return this.operationsService.delete(IDs);
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async finishInitialization(
    @Context(DEFAULT_GRAPHQL_CONTEXT) user: UsersEntity,
  ): Promise<boolean> {
    return this.operationsService.finishInitialization(user.Id);
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async finishClosing(): Promise<boolean> {
    return this.operationsService.finishClosing();
  }
}
