import { RolesEntity } from './../roles/roles.entity';
import { UsersEntity } from './../users/users.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Users_Roles')
export class UsersRolesEntity {
  @Field(() => Int)
  @PrimaryColumn()
  IdUser: number;

  @Field(() => Int)
  @PrimaryColumn()
  IdRole: number;

  @Field()
  @ManyToOne(() => UsersEntity, user => user.UserRoles)
  @JoinColumn({ name: 'IdUser', referencedColumnName: 'Id'})
  Users?: UsersEntity;

  @Field()
  @ManyToOne(() => RolesEntity, role => role.IdRole)
  @JoinColumn({ name: 'IdRole', referencedColumnName: 'IdRole'})
  Roles?: RolesEntity;
}
