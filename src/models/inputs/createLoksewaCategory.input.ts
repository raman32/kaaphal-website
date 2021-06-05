import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateLoksewaQuestionCategoryInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    titleNP: string;

}