import { CoinEntity } from './coins.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsResolver } from './coins.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CoinEntity])],
  providers: [CoinsResolver, CoinsService]
})
export class CoinsModule {}
