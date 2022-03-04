import { TablesEntity } from './tables.entity';
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class TableInput extends TablesEntity {
  @Field(() => Int)
  IdTable: number;

  @Field()
  Description: string;
  
  @Field(() => Int)
  IdGame: number;
  
  @Field(() => Boolean)
  Enabled: boolean;
}
