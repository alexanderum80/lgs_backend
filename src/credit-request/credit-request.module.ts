import { CreditRequestEntity } from './credit-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CreditRequestService } from './credit-request.service';
import { CreditRequestResolver } from './credit-request.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CreditRequestEntity])],
  providers: [CreditRequestResolver, CreditRequestService]
})
export class CreditRequestModule {}
