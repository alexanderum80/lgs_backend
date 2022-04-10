import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ViewColumn, ViewEntity } from 'typeorm';

@ObjectType()
@ViewEntity('vw_PlayerStatus')
export class PlayerStatusView {
  @Field(() => Int)
  @ViewColumn()
  IdPlayer: number;

  @Field()
  @ViewColumn()
  Name: string;

  @Field()
  @ViewColumn()
  PayInstrument: string;
  
  @Field()
  @ViewColumn()
  date: Date;
  
  @Field()
  @ViewColumn()
  ini: number;
    
  @Field()
  @ViewColumn()
  balance: number;
    
  @Field()
  @ViewColumn()
  winlost: number;
}

@ObjectType()
@ViewEntity('vw_PlayerStatusCheck')
export class PlayerStatusCheckView {
  @Field(() => Int)
  @ViewColumn()
  IdPlayer: number;

  @Field()
  @ViewColumn()
  Name: string;

  @Field()
  @ViewColumn()
  PayInstrument: string;
  
  @Field()
  @ViewColumn()
  date: Date;
  
  @Field()
  @ViewColumn()
  ini: number;
    
  @Field()
  @ViewColumn()
  ckeck: number;
    
  @Field()
  @ViewColumn()
  winlost: number;
}

@ObjectType()
@ViewEntity('vw_PlayerTracking')
export class PlayerTrackingView {
  @Field()
  @ViewColumn()
  IdTracking: number;

  @Field()
  @ViewColumn()
  IdTable: number;
  
  @Field()
  @ViewColumn()
  Description: string;
  
  @Field()
  @ViewColumn()
  IdPlayer: number;
    
  @Field()
  @ViewColumn()
  Name: string;

  @Field()
  @ViewColumn()
  IdOperations: number;
  
  @Field()
  @ViewColumn()
  IdOperationType: number;
      
  @Field()
  @ViewColumn()
  OperationName: string;

  @Field()
  @ViewColumn()
  Date: Date;
    
  @Field({ nullable: true })
  @ViewColumn()
  IdPayment?: number;
          
  @Field({ nullable: true })
  @ViewColumn()
  PayDescription?: string;

  @Field({ nullable: true })
  @ViewColumn()
  PayInstrument?: string;

  @Field({ nullable: true })
  @ViewColumn()
  Denomination?: number;
    
  @Field({ nullable: true })
  @ViewColumn()
  Qty?: number;
    
  @Field({ nullable: true })
  @ViewColumn()
  Amount?: number;
}

@ObjectType()
@ViewEntity('vw_FinalPlayerSessions')
export class FinalPlayerSessions {
  @Field(() => Int)
  @ViewColumn()
  IdSession: number;

  @Field()
  @ViewColumn()
  OpenDate: Date;
  
  @Field(() => Int)
  @ViewColumn()
  IdPlayer: number;

  @Field()
  @ViewColumn()
  Player: string;
    
  @Field()
  @ViewColumn()
  Result: number;
}

@ObjectType()
@ViewEntity('vw_DropResults')
export class DropResultsView {
  @Field()
  @ViewColumn()
  IdSession: number;
   
  @Field()
  @ViewColumn()
  IdTable: number;
    
  @Field()
  @ViewColumn()
  Table: string;

  @Field()
  @ViewColumn()
  Date: Date;

  @Field()
  @ViewColumn()
  Time: string;
        
  @Field()
  @ViewColumn()
  Amount: number;
}
