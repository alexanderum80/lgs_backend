import { PaymentInstrumentsEntity } from './payment-instruments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentInstrumentsService } from './payment-instruments.service';
import { PaymentInstrumentsResolver } from './payment-instruments.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentInstrumentsEntity])],
  providers: [PaymentInstrumentsResolver, PaymentInstrumentsService],
})
export class PaymentInstrumentsModule {}
