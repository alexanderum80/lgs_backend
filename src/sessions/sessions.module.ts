import { SessionsEntity } from './sessions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([SessionsEntity])],
  providers: [SessionsResolver, SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
