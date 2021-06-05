import { Field, InputType } from '@nestjs/graphql';
import { MCQAnswer } from '../answer.model';
import { Difficulty } from '../loksewaQuestion.model';
@InputType()
export class CreateLoksewaQuestionInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    optionA: string;
    @Field({ nullable: true })
    optionB: string;
    @Field({ nullable: true })
    optionC: string;
    @Field({ nullable: true })
    optionD: string;
    @Field(() => MCQAnswer)
    answer: MCQAnswer;
    @Field({ nullable: true })
    additionalDetails: string;
    @Field({ nullable: true })
    metaId: string;
    @Field(() => Difficulty, { nullable: true, defaultValue: Difficulty.medium })
    difficulty: Difficulty;
    @Field({ nullable: true })
    categoryId: string;
    @Field({ nullable: true })
    setId: string;


}
