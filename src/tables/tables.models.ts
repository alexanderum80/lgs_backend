import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
class Table {
  @Field(() => Int)
  IdTable: number;

  @Field()
  Description: string;
  
  @Field(() => Int)
  IdGame: number;
  
  @Field(() => Boolean)
  Enabled: boolean;
}

@InputType()
class TablesInitValues {
  @Field(() => Int)
  IdInitValue: number;

  @Field(() => Int)
  IdTable: number;

  @Field(() => Int)
  IdPayment: number;

  @Field(() => Int)
  Qty: number;
}


@InputType()
export class TableInput {
  @Field(() => Table)
  Table: Table;

  @Field(() => [TablesInitValues])
  InitValues?: TablesInitValues[];
}