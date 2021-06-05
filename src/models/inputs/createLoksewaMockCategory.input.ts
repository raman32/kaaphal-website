import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateLoksewaMockCategoryInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    titleNP: string;

}