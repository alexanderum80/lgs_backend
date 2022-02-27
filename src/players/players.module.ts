import { PlayersEntity } from './players.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PlayersEntity])],
  providers: [PlayersResolver, PlayersService]
})
export class PlayersModule {}
