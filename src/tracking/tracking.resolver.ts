import { AuthGuard } from './../shared/helpers/auth.guard';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { TrackingService } from './tracking.service';
import { PlayerStatusView, PlayerStatusCheckView, PlayerTrackingView, FinalPlayerSessions, DropResultsView } from './tracking.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => PlayerStatusView)
export class TrackingResolver {
  constructor(private readonly trackingService: TrackingService) {}

  // player status
  @Query(() => [PlayerStatusView], { name: 'currentPlayersStatus' })
  @UseGuards(new AuthGuard())
  async findPlayersStatus(): Promise<PlayerStatusView[]> {
    return this.trackingService.findCurrentPlayersStatus();
  }

  @Query(() => [PlayerStatusView], { name: 'currentPlayerStatus' })
  @UseGuards(new AuthGuard())
  async findPlayerStatus(@Args('idPlayer', { type: () => Int }) idPlayer: number): Promise<PlayerStatusView[]> {
    return this.trackingService.findCurrentPlayerStatus(idPlayer);
  }

  // player status check
  @Query(() => [PlayerStatusCheckView], { name: 'currentPlayersStatusCheck' })
  @UseGuards(new AuthGuard())
  async findPlayersStatusCheck(): Promise<PlayerStatusCheckView[]> {
    return this.trackingService.findCurrentPlayersStatusCheck();
  }

  @Query(() => [PlayerStatusCheckView], { name: 'currentPlayerStatusCheck' })
  @UseGuards(new AuthGuard())
  async findPlayerStatusCheck(@Args('idPlayer', { type: () => Int }) idPlayer: number): Promise<PlayerStatusCheckView[]> {
    return this.trackingService.findCurrentPlayerStatusCheck(idPlayer);
  }

  // player tracking
  @Query(() => [PlayerTrackingView], { name: 'currentPlayersTracking' })
  @UseGuards(new AuthGuard())
  async findPlayersTracking(): Promise<PlayerTrackingView[]> {
    return this.trackingService.findCurrentPlayersTracking();
  }

  @Query(() => [PlayerTrackingView], { name: 'currentPlayerTracking' })
  @UseGuards(new AuthGuard())
  async findPlayerTracking(@Args('idPlayer', { type: () => Int }) idPlayer: number): Promise<PlayerTrackingView[]> {
    return this.trackingService.findCurrentPlayerTracking(idPlayer);
  }

  @Query(() => [FinalPlayerSessions], { name: 'finalPlayerSessions' })
  @UseGuards(new AuthGuard())
  async findFinalPlayerSessions(
    @Args('initSession', { type: () => Int }) initSession: number,
    @Args('finalSession', { type: () => Int }) finalSession: number,
    @Args('idPlayer', { type: () => Int, nullable: true }) idPlayer: number,
  ): Promise<FinalPlayerSessions[]> {
    return this.trackingService.findFinalPlayerSession(initSession, finalSession, idPlayer);
  }

  @Query(() => [DropResultsView], { name: 'dropResults' })
  @UseGuards(new AuthGuard())
  async findDropResults(
    @Args('initSession', { type: () => Int }) initSession: number,
    @Args('finalSession', { type: () => Int }) finalSession: number,
  ): Promise<DropResultsView[]> {
    return this.trackingService.findDropResultsView(initSession, finalSession);
  }
}
