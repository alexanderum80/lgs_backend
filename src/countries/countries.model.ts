import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CountryInput {
    @Field(() => Int)
    IdCountry: number;
  
    @Field()
    Name: string;
  
    @Field(() => Boolean)
    Enabled: boolean;
}