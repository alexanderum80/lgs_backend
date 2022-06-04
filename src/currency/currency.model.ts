import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CurrencyInput {
  @Field(() => Int)
  IdCurrency: number;

  @Field()
  Currency: string;

  @Field()
  Rate: number;

  @Field()
  Enabled: boolean;
}
