import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingResolver } from './tracking.resolver';

@Module({
  providers: [TrackingResolver, TrackingService],
})
export class TrackingModule {}
