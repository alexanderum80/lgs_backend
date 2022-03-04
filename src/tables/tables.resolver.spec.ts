import { Test, TestingModule } from '@nestjs/testing';
import { TablesResolver } from './tables.resolver';
import { TablesService } from './tables.service';

describe('TablesResolver', () => {
  let resolver: TablesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablesResolver, TablesService],
    }).compile();

    resolver = module.get<TablesResolver>(TablesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
