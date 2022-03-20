import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Payments_Instrument')
export class PaymentInstrumentsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPayInstr: number;

  @Field()
  @Column()
  Name: string;
}
