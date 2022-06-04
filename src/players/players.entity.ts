import { PlayersCategoryEntity } from './../players-category/players-category.entity';
import { CountriesEntity } from './../countries/countries.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OperationsEntity } from 'src/operations/operations.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  @Field({ nullable: true })
  @Column()
  StartDate?: Date;

  @Field({ nullable: true })
  @Column()
  Personal_Id?: string;

  @Field({ nullable: true })
  @Column()
  Note?: string;

  @Field({ nullable: true })
  @Column()
  CellPhone?: string;

  @Field(() => Boolean)
  @Column()
  Enabled: boolean;

  @Field(() => Int, { nullable: true })
  @Column()
  IdCountry?: number;

  @Field(() => CountriesEntity, { nullable: true })
  @ManyToOne(() => CountriesEntity, (countries) => countries.IdCountry)
  @JoinColumn({ name: 'IdCountry', referencedColumnName: 'IdCountry' })
  Country?: CountriesEntity;

  @Field(() => Boolean)
  @Column()
  Deleted: boolean;

  @Field({ nullable: true })
  @Column()
  DateOfBirth?: Date;

  @Field(() => Int)
  @Column()
  Status: number;

  @Field(() => OperationsEntity, { nullable: true })
  @ManyToOne(() => OperationsEntity, (operations) => operations.IdOperation)
  @JoinColumn({ name: 'Status', referencedColumnName: 'IdOperation' })
  StatusInfo?: OperationsEntity;

  @Field(() => Int)
  @Column()
  IdCategory: number;

  @Field(() => PlayersCategoryEntity)
  @ManyToOne(
    () => PlayersCategoryEntity,
    (player_category) => player_category.IdCategory,
  )
  @JoinColumn({ name: 'IdCategory', referencedColumnName: 'IdCategory' })
  Category: PlayersCategoryEntity;
}
