import { Test, TestingModule } from '@nestjs/testing';
import { LendersResolver } from './lenders.resolver';
import { LendersService } from './lenders.service';

describe('LendersResolver', () => {
  let resolver: LendersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LendersResolver, LendersService],
    }).compile();

    resolver = module.get<LendersResolver>(LendersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
