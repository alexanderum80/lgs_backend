import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesResolver } from './users-roles.resolver';
import { UsersRolesEntity } from './users-roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRolesEntity])],
  providers: [UsersRolesResolver, UsersRolesService],
  exports: [UsersRolesService]
})
export class UsersRolesModule {}
