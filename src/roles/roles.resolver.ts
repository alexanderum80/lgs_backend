import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';
import { RoleInput } from './roles.model';

@Resolver(() => RolesEntity)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [RolesEntity], { name: 'getRoles' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<RolesEntity[]> {
    return this.rolesService.findAll();
  }

  @Query(() => RolesEntity, { name: 'getRole' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<RolesEntity> {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => RolesEntity)
  @UseGuards(new AuthGuard())
  createRole(@Args('createRoleInput') createRoleInput: RoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Mutation(() => RolesEntity)
  @UseGuards(new AuthGuard())
  updateRole(@Args('updateRoleInput') updateRoleInput: RoleInput) {
    return this.rolesService.update(updateRoleInput);
  }

  @Mutation(() => RolesEntity)
  @UseGuards(new AuthGuard())
  deleteRole(@Args('id', { type: () => Int }) id: number) {
    return this.rolesService.delete(id);
  }
}
