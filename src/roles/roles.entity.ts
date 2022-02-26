import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Roles')
export class RolesEntity {
  @Field(() => Int)
  @PrimaryColumn()
  IdRole: number;

  @Field()
  @Column()
  Role: string;
}
