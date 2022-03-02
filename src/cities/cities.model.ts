import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CityInput {
  @Field(() => Int)
  IdCity: number;

  @Field()
  City: string;

  @Field(() => Int)
  IdCountry: number;

  @Field(() => Boolean)
  Enabled: boolean;
}
