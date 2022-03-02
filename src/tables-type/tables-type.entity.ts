import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Tables_Types')
export class TablesTypeEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdTableType: number;

  @Field()
  @Column()
  Name: string;
}
