import { PlayerInput } from './players.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlayersService } from './players.service';
import { PlayersEntity } from './players.entity';

@Resolver(() => PlayersEntity)
export class PlayersResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => [PlayersEntity], { name: 'getPlayers' })
  async findAll(): Promise<PlayersEntity[]> {
    return this.playersService.findAll();
  }

  @Query(() => PlayersEntity, { name: 'getPlayer' })
  async findOne(
    @Args('id', { type: () => Int }) id: number
  ): Promise<PlayersEntity> {
    return this.playersService.findOne(id);
  }

  @Mutation(() => PlayersEntity)
  async createPlayer(
    @Args('playerInput') playerInput: PlayerInput
  ): Promise<PlayersEntity> {
    return this.playersService.create(playerInput);
  }

  @Mutation(() => PlayersEntity)
  async updatePlayer(
    @Args('playerInput') playerInput: PlayerInput
  ): Promise<PlayersEntity> {
    return this.playersService.update(playerInput);
  }

  @Mutation(() => Number)
  async deletePlayer(
    @Args('IDs', { type: () => [Int] }) IDs: number[]
  ): Promise<number> {
    return this.playersService.delete(IDs);
  }
}
