import { Test, TestingModule } from '@nestjs/testing';
import { TrackingResolver } from './tracking.resolver';
import { TrackingService } from './tracking.service';

describe('TrackingResolver', () => {
  let resolver: TrackingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingResolver, TrackingService],
    }).compile();

    resolver = module.get<TrackingResolver>(TrackingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
