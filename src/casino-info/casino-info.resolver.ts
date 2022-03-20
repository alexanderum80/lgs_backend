import { CasinoInfoInput } from './casino-info.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CasinoInfoService } from './casino-info.service';
import { CasinoInfoEntity } from './casino-info.entity';

@Resolver(() => CasinoInfoEntity)
export class CasinoInfoResolver {
  constructor(private readonly casinoInfoService: CasinoInfoService) {}

  @Query(() => CasinoInfoEntity, { name: 'getCasinoInfo' })
  async find(): Promise<CasinoInfoEntity> {
    return this.casinoInfoService.find();
  }

  @Query(() => Int, { name: 'getCasinoState' })
  async findCasinoState(): Promise<number> {
    return this.casinoInfoService.findCasinoState();
  }

  @Mutation(() => CasinoInfoEntity)
  async saveCasinoInfo(@Args('casinoInfoInput') casinoInfoInput: CasinoInfoInput): Promise<CasinoInfoEntity> {
    return this.casinoInfoService.save(casinoInfoInput);
  }

}
