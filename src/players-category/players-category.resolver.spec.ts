import { Test, TestingModule } from '@nestjs/testing';
import { PlayersCategoryResolver } from './players-category.resolver';
import { PlayersCategoryService } from './players-category.service';

describe('PlayersCategoryResolver', () => {
  let resolver: PlayersCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersCategoryResolver, PlayersCategoryService],
    }).compile();

    resolver = module.get<PlayersCategoryResolver>(PlayersCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
