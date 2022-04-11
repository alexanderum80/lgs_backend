import { PlayersEntity } from './../players/players.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Credit_Request')
export class CreditRequestEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCredit: number;

  @Field()
  @Column()
  Date: Date;
  
  @Field()
  @Column()
  IdPlayer: number;

  @Field(() => PlayersEntity)
  @ManyToOne(() => PlayersEntity, player => player.IdPlayer)
  @JoinColumn({ name: 'IdPlayer', referencedColumnName: 'IdPlayer' })
  Player: PlayersEntity;
    
  @Field()
  @Column()
  IdTable: number;
    
  @Field()
  @Column()
  Amount: number;
    
  @Field()
  @Column()
  Passed: boolean;
      
  @Field()
  @Column()
  Cancelled: boolean;
      
  @Field()
  @Column()
  IdSession: number;
      
  @Field()
  @Column()
  IdOperation: number;
      
  @Field()
  @Column()
  IdUser: number;
}
