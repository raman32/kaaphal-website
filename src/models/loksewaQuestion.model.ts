import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Answer, MCQAnswer } from './answer.model';
import { BaseModel } from './base.model';
import { LoksewaQuestionCategory } from './loksewaQuestionCategory.model';
import { LoksewaQuestionMeta } from './loksewaQuestionMeta.model';
import { MockQuestionEdge } from './mockQuestionEdge.model';

export enum Difficulty {
    veryEasy = 'veryEasy',
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
    veryHard = 'veryHard',
}


registerEnumType(Difficulty, { name: 'Difficulty' })

@ObjectType()
export class LoksewaQuestion extends BaseModel {
    @Field(type => LoksewaQuestionCategory)
    category?: LoksewaQuestionCategory
    @Field()
    categoryId?: string
    @Field(type => MockQuestionEdge)
    edge?: MockQuestionEdge
    @Field()
    edgeId?: string
    @Field()
    title: string
    @Field()
    optionA: string
    @Field()
    optionB: string
    @Field()
    optionC: string
    @Field()
    optionD: string
    @Field(type => MCQAnswer)
    answer: MCQAnswer
    @Field()
    additionalDetails?: string
    @Field(type => LoksewaQuestionMeta)
    meta?: LoksewaQuestionMeta
    @Field()
    metaId?: string
    @Field(type => Difficulty)
    difficulty: Difficulty
    @Field(type => [Answer])
    userAnswer: Answer[]
}