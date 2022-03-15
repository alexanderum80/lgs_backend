import { Test, TestingModule } from '@nestjs/testing';
import { PaymentInstrumentsResolver } from './payment-instruments.resolver';
import { PaymentInstrumentsService } from './payment-instruments.service';

describe('PaymentInstrumentsResolver', () => {
  let resolver: PaymentInstrumentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentInstrumentsResolver, PaymentInstrumentsService],
    }).compile();

    resolver = module.get<PaymentInstrumentsResolver>(PaymentInstrumentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
