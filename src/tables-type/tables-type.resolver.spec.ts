import { Test, TestingModule } from '@nestjs/testing';
import { TablesTypeResolver } from './tables-type.resolver';
import { TablesTypeService } from './tables-type.service';

describe('TablesTypeResolver', () => {
  let resolver: TablesTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablesTypeResolver, TablesTypeService],
    }).compile();

    resolver = module.get<TablesTypeResolver>(TablesTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
