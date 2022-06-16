import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class CageInput {
  @Field(() => Int, { nullable: true })
  IdCageOp?: number;

  @Field(() => Int)
  IdTable: number;

  @Field(() => Int)
  IdPlayer: number;

  @Field(() => Int)
  IdOperationType: number;

  @Field(() => Int)
  IdOperation: number;

  @Field(() => Int)
  IdPayment: number;

  @Field()
  Date: Date;

  @Field(() => Int)
  IdUser: number;

  @Field()
  Amount: number;
}

@ObjectType()
export class MoneyBreakdown {
  @Field()
  IdPayInstr: number;

  @Field()
  IdPayment: number;

  @Field()
  Quantity: number;
}
