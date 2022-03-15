import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class OperationRInput {
  @Field(() => Int, { nullable: true })
  IdOperationKey?: number;
    
  @Field(() => Int)
  IdTable: number;

  @Field(() => Int)
  IdState: number;
}

@InputType()
export class OperationDInput {
  @Field(() => Int, { nullable: true })
  IdSerial?: number;

  @Field(() => Int)
  IdOperationKeyD: number;

  @Field(() => Int)
  IdPayInstrument: number;
  
  @Field(() => Int)
  IdDetail: number;
    
  @Field()
  Qty: number;
}

@InputType()
export class OperationInput {
  @Field(() => OperationRInput)
  OperationR: OperationRInput;

  @Field(() => [OperationDInput])
  OperationD: OperationDInput[]
}

export enum EPaymentInstrument {
  'CHIPS' = 1,
  'PLATES' = 2,
  'CASH' = 3
}