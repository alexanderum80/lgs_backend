import { CageEntity } from './cage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CageService } from './cage.service';
import { CageResolver } from './cage.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CageEntity])],
  providers: [CageResolver, CageService],
  exports: [CageService]
})
export class CageModule {}
