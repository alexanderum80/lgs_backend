import { LendersEntity } from './lenders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LendersService } from './lenders.service';
import { LendersResolver } from './lenders.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LendersEntity])],
  providers: [LendersResolver, LendersService]
})
export class LendersModule {}
