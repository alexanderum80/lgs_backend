import { CoinEntity } from './../coins/coins.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ViewColumn, ViewEntity, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Payments')
export class PaymentsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPayment: number;

  @Field()
  @Column()
  Description: string;

  @Field()
  @Column()
  Denomination: number;

  @Field(() => Int)
  @Column()
  IdPayInstr: number;

  @Field(() => Int)
  @Column()
  IdCoin: number;

  @Field(() => CoinEntity)
  @ManyToOne(() => CoinEntity, coin => coin.IdCoin)
  @JoinColumn({ name: 'IdCoin', referencedColumnName: 'IdCoin' })
  Coin: CoinEntity;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;
}

@ObjectType()
@ViewEntity('vw_Payments')
export class PaymentsView {
    @Field()
    @ViewColumn()
    IdPayment: number;

    @Field()
    @ViewColumn()
    Description: string;

    @Field()
    @ViewColumn()
    Denomination: number;

    @Field()
    @ViewColumn()
    IdPayInstr: number;

    @Field()
    @ViewColumn()
    IdCoin: number;

    @Field()
    @ViewColumn()
    Enabled: boolean;
    
    @Field()
    @ViewColumn()
    PayInstrument: string;

    @Field()
    @ViewColumn()
    Coin: string;
    
    @Field()
    @ViewColumn()
    Rate: number;
       
    @Field()
    @ViewColumn()
    PaymentName: string;
}