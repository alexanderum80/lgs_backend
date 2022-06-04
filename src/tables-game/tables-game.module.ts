import { TablesGameEntity } from './tables-game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TablesGameService } from './tables-game.service';
import { TablesGameResolver } from './tables-game.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([TablesGameEntity])],
  providers: [TablesGameResolver, TablesGameService],
})
export class TablesGameModule {}
