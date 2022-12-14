import { SharedModule } from './../shared/shared.module';
import { UsersRolesModule } from './../users-roles/users-roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersEntity, UsersLogEntity } from './users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, UsersLogEntity]),
    UsersRolesModule,
    SharedModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class usersModule {}
