import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class TableGameInput {
  @Field(() => Int)
  IdGame: number;

  @Field()
  Name: string;
}
