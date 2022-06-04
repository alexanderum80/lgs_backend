import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class PaymentInput {
  @Field(() => Int)
  IdPayment: number;

  @Field()
  Denomination: number;

  @Field(() => Int)
  IdPayInstr: number;

  @Field(() => Int)
  IdCurrency: number;

  @Field(() => Boolean)
  Enabled: boolean;

  @Field({ nullable: true })
  Picture?: string;
}
