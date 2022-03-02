import { Test, TestingModule } from '@nestjs/testing';
import { CasinoInfoResolver } from './casino-info.resolver';
import { CasinoInfoService } from './casino-info.service';

describe('CasinoInfoResolver', () => {
  let resolver: CasinoInfoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasinoInfoResolver, CasinoInfoService],
    }).compile();

    resolver = module.get<CasinoInfoResolver>(CasinoInfoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
