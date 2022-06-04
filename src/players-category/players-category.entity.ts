import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Player_Category')
export class PlayersCategoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCategory: number;

  @Field()
  @Column()
  Description: string;
}
