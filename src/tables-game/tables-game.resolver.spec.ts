import { Test, TestingModule } from '@nestjs/testing';
import { TablesGameResolver } from './tables-game.resolver';
import { TablesGameService } from './tables-game.service';

describe('TablesGameResolver', () => {
  let resolver: TablesGameResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablesGameResolver, TablesGameService],
    }).compile();

    resolver = module.get<TablesGameResolver>(TablesGameResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
