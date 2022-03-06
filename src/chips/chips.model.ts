import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class ChipInput {
  @Field(() => Int)
  IdChip: number;

  @Field()
  Color: string;

  @Field()
  Value: number;

  @Field({ nullable: true })
  Image?: string;
}
