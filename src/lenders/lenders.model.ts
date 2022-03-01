import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LenderInput {
  @Field(() => Int)
  IdLender: number;

  @Field()
  Name: string;

  @Field()
  Enabled: boolean;
}
