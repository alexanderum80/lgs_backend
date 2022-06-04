import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Currency')
export class CurrencyEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCurrency: number;

  @Field()
  @Column()
  Currency: string;

  @Field()
  @Column()
  Rate: number;

  @Field()
  @Column()
  Enabled: boolean;
}
