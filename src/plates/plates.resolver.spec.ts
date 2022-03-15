import { Test, TestingModule } from '@nestjs/testing';
import { PlatesResolver } from './plates.resolver';
import { PlatesService } from './plates.service';

describe('PlatesResolver', () => {
  let resolver: PlatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatesResolver, PlatesService],
    }).compile();

    resolver = module.get<PlatesResolver>(PlatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
