import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity('LGS_CFG')
export class CasinoInfoEntity {
  @Field()
  @PrimaryColumn()
  Id: number;

  @Field()
  @Column()
  Name: string

  @Field()
  @Column()
  Address: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  Phone?: string;

  @Field()
  @Column()
  IdCountry: number;

  @Field()
  @Column()
  IdCity: number;
  
  @Field()
  @Column()
  IdState: number;
    
  @Field()
  @Column()
  OpeningDate: Date;
}
