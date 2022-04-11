import { Test, TestingModule } from '@nestjs/testing';
import { CreditRequestResolver } from './credit-request.resolver';
import { CreditRequestService } from './credit-request.service';

describe('CreditRequestResolver', () => {
  let resolver: CreditRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditRequestResolver, CreditRequestService],
    }).compile();

    resolver = module.get<CreditRequestResolver>(CreditRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
