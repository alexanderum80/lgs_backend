import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { SessionsEntity } from './sessions.entity';

@Resolver(() => SessionsEntity)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Query(() => [SessionsEntity], { name: 'getSessions' })
  @UseGuards(new AuthGuard())
  async findAll(): Promise<SessionsEntity[]> {
    return this.sessionsService.findAll();
  }

  @Query(() => SessionsEntity, { name: 'getSession' })
  @UseGuards(new AuthGuard())
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<SessionsEntity> {
    return this.sessionsService.findOne(id);
  }

}
