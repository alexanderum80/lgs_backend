import { Test, TestingModule } from '@nestjs/testing';
import { TablesGameService } from './tables-game.service';

describe('TablesGameService', () => {
  let service: TablesGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablesGameService],
    }).compile();

    service = module.get<TablesGameService>(TablesGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
