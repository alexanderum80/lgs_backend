import { UserInput } from './users.model';
import { UsersService as UsersService } from './users.service';
import { Resolver, Query, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { UsersEntity } from './users.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/helpers/auth.guard';

@Resolver(() => UsersEntity)
export class UsersResolver {
    constructor(
        protected readonly _usersService: UsersService
    ) {}

    @Query(() => UsersEntity)
    async authenticateUser(
        @Args('user') user: string,
        @Args('passw') passw: string
    ): Promise<UsersEntity> {
        return this._usersService.authenticate(user, passw);
    }

    @Query(() => UsersEntity)
    @UseGuards(new AuthGuard())
    async refreshToken(
        @Args('userInfo') userInfo: UserInput
    ): Promise<UsersEntity> {
        return this._usersService.refreshToken(userInfo);
    }

    @Query(() => [UsersEntity])
    @UseGuards(new AuthGuard())
    async getAllUsers(): Promise<UsersEntity[]> {
        return this._usersService.findAll();
    }

    @Query(() => UsersEntity)
    @UseGuards(new AuthGuard())
    async getUserById(
        @Args({ name: 'id', type: () => Int }) id: number
    ): Promise<UsersEntity> {
        return this._usersService.findOne(id);
    }

    @Query(() => UsersEntity)
    @UseGuards(new AuthGuard())
    async getUserByName(
        @Args('name') name: string
    ): Promise<UsersEntity> {
        return this._usersService.findByName(name);
    }

    @Mutation(() => UsersEntity)
    @UseGuards(new AuthGuard())
    async createUser(
        @Args('userInfo') userInfo: UserInput
    ): Promise<UsersEntity> {
        return this._usersService.create(userInfo);
    }

    @Mutation(() => UsersEntity)
    @UseGuards(new AuthGuard())
    async updateUser(
        @Args('userInfo') userInfo: UserInput
    ): Promise<UsersEntity> {
        return this._usersService.update(userInfo);
    }

    @Mutation(() => Number)
    @UseGuards(new AuthGuard())
    async deleteUser(
        @Args({ name: 'IDs', type: () => [Int] }) IDs: number[]
    ): Promise<Number> {
        return this._usersService.delete(IDs);
    }

    @Mutation(() => Number)
    @UseGuards(new AuthGuard())
    async recoverUser(
        @Args({ name: 'id', type: () => Int }) id: number
    ): Promise<Number> {
        return this._usersService.recover(id);
    }
}
