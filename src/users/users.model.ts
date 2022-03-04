import { UsersEntity } from './users.entity';
import { Field, InputType, Int } from '@nestjs/graphql';

export enum ERoles {
    'Administrator' = 1,
    'General manager' = 2,
    'Table Manager' = 3,
    'Pitboss' = 4,
    'Cage' = 5,
    'CCTV' = 6
}

@InputType()
export class UserInput extends UsersEntity {
    @Field()
    Id: number;

    @Field()
    UserName: string;

    @Field()
    Name: string;

    @Field()
    LastName: string;

    @Field()
    Psw: string;
    
    @Field(() => [Int])
    Role: number[];

    @Field()
    Enabled: boolean
}