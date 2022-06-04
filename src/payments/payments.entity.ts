import { CurrencyEntity } from './../currency/currency.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ViewColumn,
  ViewEntity,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Payments')
export class PaymentsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPayment: number;

  @Field()
  @Column()
  Denomination: number;

  @Field(() => Int)
  @Column()
  IdPayInstr: number;

  @Field(() => Int)
  @Column()
  IdCurrency: number;

  @Field(() => CurrencyEntity)
  @ManyToOne(() => CurrencyEntity, (currency) => currency.IdCurrency)
  @JoinColumn({ name: 'IdCurrency', referencedColumnName: 'IdCurrency' })
  Currency: CurrencyEntity;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;

  @Field({ nullable: true })
  @Column({ type: 'bytea' })
  Picture?: string;
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
  IdCurrency: number;

  @Field()
  @ViewColumn()
  Enabled: boolean;

  @Field()
  @ViewColumn()
  PayInstrument: string;

  @Field()
  @ViewColumn()
  Currency: string;

  @Field()
  @ViewColumn()
  Rate: number;

  @Field()
  @ViewColumn()
  PaymentName: string;
}
