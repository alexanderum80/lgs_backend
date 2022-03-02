import { TablesTypeEntity } from './tables-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TablesTypeService } from './tables-type.service';
import { TablesTypeResolver } from './tables-type.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TablesTypeEntity])],
  providers: [TablesTypeResolver, TablesTypeService]
})
export class TablesTypeModule {}
