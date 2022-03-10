import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('LGS_Player')
export class PlayersEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  IdPlayer?: number;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column()
  LastName: string;

  @Field()
  @Column()
  StartDate?: Date;
  
  @Field()
  @Column()
  Personal_Id: string;

  @Field()
  @Column()
  Passport_Number?: string;

  @Field()
  @Column()
  Note?: string;

  @Field()
  @Column()
  CellPhone?: string;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;

  @Field(() => Int)
  @Column()
  IdCountry?: number;

  @Field(() => Boolean)
  @Column()
  Deleted: boolean;
  
  @Field()
  @Column()
  DateOfBirth: Date;
}
