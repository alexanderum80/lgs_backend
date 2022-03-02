import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CasinoInfoInput {
  @Field()
  Id: number;

  @Field()
  Name: string;

  @Field()
  Address: string;

  @Field({ nullable: true })
  Phone?: string;

  @Field()
  IdCountry: number;

  @Field()
  IdCity: number;
}
