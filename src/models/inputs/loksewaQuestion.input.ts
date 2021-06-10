import { Field, InputType, Int } from '@nestjs/graphql';
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
    edgeId: string;
}

@InputType()
export class UpdateLoksewaQuestionInput extends CreateLoksewaQuestionInput {
    @Field()
    id: string;
}

@InputType()
export class CreateSetQuestionInput {
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
    @Field(() => Int)
    weight: number;
    @Field(() => Int, { nullable: true })
    order: number;
    @Field()
    setId: string;
}

@InputType()
export class UpdateSetQuestionInput extends CreateSetQuestionInput {
    @Field()
    id: string;
    @Field()
    questionId: string;
}
