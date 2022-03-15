import { CoinEntity } from './../coins/coins.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Plates')
export class PlatesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPlate: number;

  @Field()
  @Column()
  Value: number;
  
  @Field(() => Int)
  @Column()
  IdCoin: number;

  @Field(() => CoinEntity)
  @ManyToOne(() => CoinEntity, coin => coin.IdCoin)
  @JoinColumn({ name: 'IdCoin', referencedColumnName: 'IdCoin' })
  Coin: CoinEntity;

  @Field()
  @Column()
  Color: string;
}
