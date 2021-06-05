import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaMockSet } from './loksewaMockSet';

@ObjectType()
export class LoksewaMockCategory extends BaseModel {
    @Field(type => [LoksewaMockSet])
    questionSets: LoksewaMockSet[]
    @Field({ nullable: true })
    title?: string
    @Field({ nullable: true })
    titleNP?: string
}