import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesEntity } from './users-roles.entity';
import { UsersRolesInput } from './users-roles.model';

@Resolver(() => UsersRolesEntity)
export class UsersRolesResolver {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Query(() => [UsersRolesEntity], { name: 'getUsersRoles' })
  @UseGuards(new AuthGuard())
  async findAll():Promise<UsersRolesEntity[]> {
    return this.usersRolesService.findAll();
  }

  @Query(() => [UsersRolesEntity], { name: 'getUserRoles' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('idUser', { type: () => Int }) idUser: number): Promise<UsersRolesEntity[]> {
    return this.usersRolesService.findOne(idUser);
  }

  @Mutation(() => UsersRolesEntity)
  @UseGuards(new AuthGuard())
  async createUsersRole(@Args('usersRolesInput') usersRolesInput: UsersRolesInput): Promise<UsersRolesEntity> {
    return this.usersRolesService.create(usersRolesInput);
  }

  @Mutation(() => UsersRolesEntity)
  @UseGuards(new AuthGuard())
  removeUsersRole(@Args('id', { type: () => Int }) id: number): Promise<UsersRolesEntity> {
    return this.usersRolesService.remove(id);
  }
}
