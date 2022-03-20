import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PaymentInput {
  @Field(() => Int)
  IdPayment: number;

  @Field()
  Description: string;

  @Field()
  Denomination: number;

  @Field(() => Int)
  IdPayInstr: number;

  @Field(() => Int)
  IdCoin: number;

  @Field(() => Boolean)
  Enabled: boolean;
}
