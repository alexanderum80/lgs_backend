import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CasinoInfoInput } from './casino-info.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CasinoInfoService } from './casino-info.service';
import { CasinoInfoEntity } from './casino-info.entity';

@Resolver(() => CasinoInfoEntity)
export class CasinoInfoResolver {
  constructor(private readonly casinoInfoService: CasinoInfoService) {}

  @Query(() => CasinoInfoEntity, { name: 'getCasinoInfo' })
  @UseGuards(new AuthGuard())
  async find(): Promise<CasinoInfoEntity> {
    return this.casinoInfoService.find();
  }

  @Query(() => Int, { name: 'getCasinoState' })
  @UseGuards(new AuthGuard())
  async findCasinoState(): Promise<number> {
    return this.casinoInfoService.findCasinoState();
  }

  @Mutation(() => CasinoInfoEntity)
  @UseGuards(new AuthGuard())
  async saveCasinoInfo(@Args('casinoInfoInput') casinoInfoInput: CasinoInfoInput): Promise<CasinoInfoEntity> {
    return this.casinoInfoService.save(casinoInfoInput);
  }

}
