import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SessionInput {
  @Field(() => Int)
  IdSession: number;

  @Field()
  OpenDate: Date;
  
  @Field()
  CloseDate: Date;
}
