import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaQuestion } from './loksewaQuestion.model';
import { LoksewaTest } from './loksewaTest.model';


export enum AnswerStatus {
    unanswered,
    wrong,
    correct
}
export enum MCQAnswer {
    A,
    B,
    C,
    D
}

registerEnumType(AnswerStatus, { name: 'AnswerStatus' })
registerEnumType(MCQAnswer, { name: 'MCQAnswer' })

@ObjectType({ description: 'Major Category for Post' })
export class Answer extends BaseModel {
    @Field(type => LoksewaTest)
    test: LoksewaTest
    @Field()
    testId: string
    @Field(type => LoksewaQuestion)
    question: LoksewaQuestion
    @Field()
    questionId: string
    @Field(type => MCQAnswer)
    answer?: MCQAnswer
    @Field(type => AnswerStatus)
    status: AnswerStatus
}