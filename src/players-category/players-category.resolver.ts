import { Resolver, Query } from '@nestjs/graphql';
import { PlayersCategoryService } from './players-category.service';
import { PlayersCategoryEntity } from './players-category.entity';

@Resolver(() => PlayersCategoryEntity)
export class PlayersCategoryResolver {
  constructor(
    private readonly playersCategoryService: PlayersCategoryService,
  ) {}

  @Query(() => [PlayersCategoryEntity], { name: 'getPlayersCategory' })
  findAll() {
    return this.playersCategoryService.findAll();
  }
}
