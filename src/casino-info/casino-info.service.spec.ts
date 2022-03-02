import { Test, TestingModule } from '@nestjs/testing';
import { CasinoInfoService } from './casino-info.service';

describe('CasinoInfoService', () => {
  let service: CasinoInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CasinoInfoService],
    }).compile();

    service = module.get<CasinoInfoService>(CasinoInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
