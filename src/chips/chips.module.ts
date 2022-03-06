import { ChipsEntity } from './chips.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ChipsService } from './chips.service';
import { ChipsResolver } from './chips.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ChipsEntity])],
  providers: [ChipsResolver, ChipsService]
})
export class ChipsModule {}
