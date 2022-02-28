import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Coins')
export class CoinEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCoin: number;

  @Field()
  @Column()
  Coin: string;

  @Field()
  @Column()
  Rate: number;

  @Field()
  @Column()
  Enabled: boolean;
}
