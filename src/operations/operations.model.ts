import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class OperationRInput {
  @Field(() => Int, { nullable: true })
  IdOperation?: number;
    
  @Field(() => Int, { nullable: true })
  Consecutive?: number;

  @Field(() => Int)
  IdOperationType: number;
    
  @Field(() => Int)
  IdTable: number;

  @Field(() => Int)
  IdPlayer: number;

  @Field(() => Int, { nullable: true })
  IdUser?: number;
    
  @Field(() => Date, { nullable: true })
  Date?: Date;

  @Field(() => Boolean, { nullable: true })
  Finished?: boolean;
  
  @Field(() => Boolean, { nullable: true })
  Cancelled?: boolean;
}

@InputType()
export class OperationDInput {
  @Field(() => Int, { nullable: true })
  IdOperationDetail?: number;

  @Field(() => Int)
  IdOperation: number;

  @Field(() => Int)
  IdPayment: number;
    
  @Field()
  Denomination: number;
  
  @Field(() => Int)
  IdInstrument: number;

  @Field()
  Rate: number;
    
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
  'CASH' = 3,
  'BONUS' = 4
}

export enum EOperations {
  'INITIALIZING' = 1,
  'DEPOSIT' = 2,
  'EXTRACTION' = 3,
  'CHECK' = 4,
  'DROP' = 5,
  'CLOSED' = 6,
  'REFUND' = 7,
  'PLAYER-IN' = 8,
  'PLAYER-OUT' = 9,
  'OPEN' = 10,
  'CREDIT' = 11
}