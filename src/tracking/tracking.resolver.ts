import { AuthGuard } from './../shared/helpers/auth.guard';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { TrackingService } from './tracking.service';
import { PlayerStatusView, PlayerStatusCheckView, PlayerTrackingView, FinalPlayerSessions, DropResultsView, MasterTrackingView } from './tracking.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => PlayerStatusView)
export class TrackingResolver {
  constructor(private readonly trackingService: TrackingService) {}

  // player status
  @Query(() => [PlayerStatusView], { name: 'currentPlayersStatus' })
  @UseGuards(new AuthGuard())
  async findPlayersStatus(@Args('idPlayer', { type: () => Int, nullable: true }) idPlayer: number): Promise<PlayerStatusView[]> {
    return this.trackingService.findCurrentPlayersStatus(idPlayer);
  }

  // player status check
  @Query(() => [PlayerStatusCheckView], { name: 'currentPlayersStatusCheck' })
  @UseGuards(new AuthGuard())
  async findPlayersStatusCheck(@Args('idPlayer', { type: () => Int, nullable: true }) idPlayer: number): Promise<PlayerStatusCheckView[]> {
    return this.trackingService.findCurrentPlayersStatusCheck(idPlayer);
  }

  // player tracking
  @Query(() => [MasterTrackingView], { name: 'masterTracking' })
  @UseGuards(new AuthGuard())
  async findMasterTracking(
    @Args('initSession', { type: () => Int }) initSession: number,
    @Args('finalSession', { type: () => Int }) finalSession: number,
    @Args('idPlayer', { type: () => Int, nullable: true }) idPlayer: number,
  ): Promise<MasterTrackingView[]> {
    return this.trackingService.findMasterTrackingView(initSession, finalSession, idPlayer);
  }

  @Query(() => [PlayerTrackingView], { name: 'currentPlayersTracking' })
  @UseGuards(new AuthGuard())
  async findPlayersTracking(@Args('idPlayer', { type: () => Int, nullable: true }) idPlayer: number): Promise<PlayerTrackingView[]> {
    return this.trackingService.findCurrentPlayersTracking(idPlayer);
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
