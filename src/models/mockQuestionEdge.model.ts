import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { LoksewaMockSet } from './loksewaMockSet.model'
import { LoksewaQuestion } from './loksewaQuestion.model'

@ObjectType()
export class MockQuestionEdge extends BaseModel {
    @Field(() => Int)
    order: number
    @Field(() => Int)
    weight: number
    @Field(() => LoksewaQuestion)
    question: LoksewaQuestion
    @Field()
    questionId: string
    @Field(() => LoksewaMockSet)
    LoksewaMockSet: LoksewaMockSet
    @Field()
    setId: string
}