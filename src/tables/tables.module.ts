import { TablesEntity, TablesInitValuesEntity } from './tables.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesResolver } from './tables.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TablesEntity, TablesInitValuesEntity])],
  providers: [TablesResolver, TablesService],
  exports: [TablesService],
})
export class TablesModule {}
