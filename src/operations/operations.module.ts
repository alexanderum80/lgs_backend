import { CageModule } from './../cage/cage.module';
import { CasinoInfoModule } from './../casino-info/casino-info.module';
import { TablesModule } from './../tables/tables.module';
import { OperationsREntity, OperationsDEntity, OperationsEntity } from './operations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsResolver } from './operations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OperationsEntity, OperationsREntity, OperationsDEntity]), 
    TablesModule, 
    CasinoInfoModule,
    CageModule
  ],
  providers: [OperationsResolver, OperationsService]
})
export class OperationsModule {}
