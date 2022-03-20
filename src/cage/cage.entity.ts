import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Cage')
export class CageEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCageOp: number;

  @Field(() => Int)
  @Column()
  IdTable: number;
  
  @Field(() => Int)
  @Column()
  IdPlayer: number;
    
  @Field(() => Int)
  @Column()
  IdOperationType: number;
      
  @Field(() => Int)
  @Column()
  IdOperation: number;
          
  @Field(() => Int)
  @Column()
  IdPayment: number;
    
  @Field()
  @Column()
  Date: Date;
            
  @Field(() => Int)
  @Column()
  IdUser: number;

  @Field()
  @Column()
  Amount: number;
}

