import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Tables_Games')
export class TablesGameEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdGame: number;

  @Field()
  @Column()
  Name: string;
}
