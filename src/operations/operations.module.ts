import { OperationsREntity, OperationsDEntity } from './operations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsResolver } from './operations.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([OperationsREntity, OperationsDEntity])],
  providers: [OperationsResolver, OperationsService]
})
export class OperationsModule {}
