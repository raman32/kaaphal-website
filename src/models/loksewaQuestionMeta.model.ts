import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaQuestion } from './loksewaQuestion.model';

@ObjectType()
export class LoksewaQuestionMeta extends BaseModel {
    @Field()
    body?: string
    @Field(type => [LoksewaQuestion])
    LoksewaQuestion: LoksewaQuestion[]
}