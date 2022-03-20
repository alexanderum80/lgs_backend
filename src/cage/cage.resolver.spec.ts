import { Test, TestingModule } from '@nestjs/testing';
import { CageResolver } from './cage.resolver';
import { CageService } from './cage.service';

describe('CageResolver', () => {
  let resolver: CageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CageResolver, CageService],
    }).compile();

    resolver = module.get<CageResolver>(CageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
