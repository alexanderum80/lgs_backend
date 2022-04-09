import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_OP_Sessions')
export class SessionsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdSession: number;

  @Field()
  @Column()
  OpenDate: Date;
  
  @Field()
  @Column()
  CloseDate: Date;
}
