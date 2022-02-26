import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationResponse {
    @Field()
    raw: number;

    @Field(type => String, { nullable: true })
    affected?: string;
}