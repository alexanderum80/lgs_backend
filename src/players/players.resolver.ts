import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { PlayerInput } from './players.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { PlayersEntity } from './players.entity';

@Resolver(() => PlayersEntity)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => [PlayersEntity], { name: 'getPlayers' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<PlayersEntity[]> {
    return this.playersService.findAll();
  }

  @Query(() => PlayersEntity, { name: 'getPlayer' })
  @UseGuards(new AuthGuard())
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PlayersEntity> {
    return this.playersService.findOne(id);
  }

  @Mutation(() => PlayersEntity)
  @UseGuards(new AuthGuard())
  async createPlayer(
    @Args('playerInput') playerInput: PlayerInput,
  ): Promise<PlayersEntity> {
    return this.playersService.create(playerInput);
  }

  @Mutation(() => PlayersEntity)
  @UseGuards(new AuthGuard())
  async updatePlayer(
    @Args('playerInput') playerInput: PlayerInput,
  ): Promise<PlayersEntity> {
    return this.playersService.update(playerInput);
  }

  @Mutation(() => Number)
  @UseGuards(new AuthGuard())
  async deletePlayer(
    @Args('IDs', { type: () => [Int] }) IDs: number[],
  ): Promise<number> {
    return this.playersService.delete(IDs);
  }

  @Mutation(() => Number)
  async recoverPlayer(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<number> {
    return this.playersService.recover(id);
  }
}
