import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CoinInput {
  @Field(() => Int)
  IdCoin: number;

  @Field()
  Coin: string;

  @Field()
  Rate: number;

  @Field()
  Enabled: boolean;
}
