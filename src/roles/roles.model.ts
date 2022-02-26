import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class RoleInput {
  @Field(() => Int)
  IdRole: number;
  
  @Field()
  Role: string;
}
