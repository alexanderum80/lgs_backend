import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Lenders')
export class LendersEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdLender: number;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column()
  Enabled: boolean;
}
