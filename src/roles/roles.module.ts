import { RolesEntity } from './roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity])],
  providers: [RolesResolver, RolesService],
})
export class RolesModule {}
