import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaMockSet } from './loksewaMockSet.model';

@ObjectType()
export class LoksewaMockCategory extends BaseModel {
    @Field(type => [LoksewaMockSet], { nullable: 'itemsAndList' })
    questionSets: LoksewaMockSet[]
    @Field({ nullable: true })
    title?: string
    @Field({ nullable: true })
    titleNP?: string
    @Field(type => Int, { nullable: true, defaultValue: 90 })
    totalMins: number
    @Field(type => Int, { nullable: true, defaultValue: 0 })
    negativeMarkingRatio: number
}
