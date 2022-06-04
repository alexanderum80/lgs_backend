import { PlayersEntity } from './players.entity';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PlayerInput extends PlayersEntity {
  @Field()
  IdPlayer?: number;

  @Field()
  Name: string;

  @Field()
  LastName: string;

  @Field({ nullable: true })
  StartDate?: Date;

  @Field({ nullable: true })
  Personal_Id?: string;

  @Field({ nullable: true })
  Note?: string;

  @Field({ nullable: true })
  CellPhone?: string;

  @Field(() => Boolean)
  Enabled: boolean;

  @Field(() => Int, { nullable: true })
  IdCountry?: number;

  @Field(() => Date, { nullable: true })
  DateOfBirth?: Date;

  @Field(() => Int)
  IdCategory: number;
}
