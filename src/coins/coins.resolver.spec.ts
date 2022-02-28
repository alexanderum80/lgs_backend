import { Test, TestingModule } from '@nestjs/testing';
import { CoinsResolver } from './coins.resolver';
import { CoinsService } from './coins.service';

describe('CoinsResolver', () => {
  let resolver: CoinsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinsResolver, CoinsService],
    }).compile();

    resolver = module.get<CoinsResolver>(CoinsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
