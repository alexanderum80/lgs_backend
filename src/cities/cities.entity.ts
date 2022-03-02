import { CountriesEntity } from './../countries/countries.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_Cities')
export class CitiesEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdCity: number;

  @Field()
  @Column()
  City: string;
  
  @Field()
  @Column()
  IdCountry: number;

  @Field(() => CountriesEntity)
  @ManyToOne(() => CountriesEntity, countries => countries.IdCountry)
  @JoinColumn({ name: 'IdCountry', referencedColumnName: 'IdCountry'})
  Country?: CountriesEntity;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;
}
