import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    firstName: string;
    @Field({ nullable: true })
    lastName: string;
    @Field({ nullable: true })
    middleName: string;
    @Field({ nullable: true })
    displayName: string;
}
