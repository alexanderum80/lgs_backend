import { SessionsModule } from './../sessions/sessions.module';
import { CasinoInfoEntity } from './casino-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CasinoInfoService } from './casino-info.service';
import { CasinoInfoResolver } from './casino-info.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CasinoInfoEntity]), SessionsModule],
  providers: [CasinoInfoResolver, CasinoInfoService],
  exports: [CasinoInfoService]
})
export class CasinoInfoModule {}
