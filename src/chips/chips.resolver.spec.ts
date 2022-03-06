import { Test, TestingModule } from '@nestjs/testing';
import { ChipsResolver } from './chips.resolver';
import { ChipsService } from './chips.service';

describe('ChipsResolver', () => {
  let resolver: ChipsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChipsResolver, ChipsService],
    }).compile();

    resolver = module.get<ChipsResolver>(ChipsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
