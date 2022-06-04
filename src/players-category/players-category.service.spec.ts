import { Test, TestingModule } from '@nestjs/testing';
import { PlayersCategoryService } from './players-category.service';

describe('PlayersCategoryService', () => {
  let service: PlayersCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersCategoryService],
    }).compile();

    service = module.get<PlayersCategoryService>(PlayersCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
