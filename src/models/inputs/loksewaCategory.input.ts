import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateLoksewaQuestionCategoryInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    titleNP: string;

}

@InputType()
export class UpdateLoksewaQuestionCategoryInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    titleNP: string;
}