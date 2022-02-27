import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Countries')
export class CountriesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCountry: number;

  @Field()
  @Column()
  Name: string;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;
}
