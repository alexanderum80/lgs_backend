import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesEntity } from './users-roles.entity';
import { UsersRolesInput } from './users-roles.model';

@Resolver(() => UsersRolesEntity)
export class UsersRolesResolver {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Query(() => [UsersRolesEntity], { name: 'getUsersRoles' })
  async findAll() {
    return this.usersRolesService.findAll();
  }

  @Query(() => UsersRolesEntity, { name: 'getUserRoles' })
  async findOne(@Args('idUser', { type: () => Int }) id: number): Promise<UsersRolesEntity[]> {
    return this.usersRolesService.findOne(id);
  }

  @Mutation(() => UsersRolesEntity)
  createUsersRole(@Args('usersRolesInput') usersRolesInput: UsersRolesInput) {
    return this.usersRolesService.create(usersRolesInput);
  }
  
  @Mutation(() => UsersRolesEntity)
  updateUsersRole(@Args('usersRolesInput') usersRolesInput: UsersRolesInput) {
    return this.usersRolesService.update(usersRolesInput);
  }

  @Mutation(() => UsersRolesEntity)
  removeUsersRole(@Args('id', { type: () => Int }) id: number): Promise<UsersRolesEntity> {
    return this.usersRolesService.remove(id);
  }
}
