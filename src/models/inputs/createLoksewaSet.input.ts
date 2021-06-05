import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateLoksewaMockSet {
    @Field()
    title: string;

}