import { Test, TestingModule } from '@nestjs/testing';
import { TablesTypeService } from './tables-type.service';

describe('TablesTypeService', () => {
  let service: TablesTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablesTypeService],
    }).compile();

    service = module.get<TablesTypeService>(TablesTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
