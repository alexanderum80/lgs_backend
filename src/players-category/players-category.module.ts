import { PlayersCategoryEntity } from './players-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlayersCategoryService } from './players-category.service';
import { PlayersCategoryResolver } from './players-category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersCategoryEntity])],
  providers: [PlayersCategoryResolver, PlayersCategoryService],
})
export class PlayersCategoryModule {}
