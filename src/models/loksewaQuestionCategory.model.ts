import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaQuestion } from './loksewaQuestion.model';

@ObjectType()
export class LoksewaQuestionCategory extends BaseModel {
    @Field({ nullable: true })
    title?: string
    @Field({ nullable: true })
    titleNP?: string
    @Field(type => [LoksewaQuestion])
    questions: LoksewaQuestion[]
}