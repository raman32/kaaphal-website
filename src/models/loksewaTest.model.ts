import { Field, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.model';
import { BaseModel } from './base.model';
import { LoksewaMockSet } from './loksewaMockSet.model';
import { User } from './user.model';

@ObjectType()
export class LoksewaTest extends BaseModel {
    @Field(type => User)
    user: User
    @Field()
    userId: string
    @Field(type => LoksewaMockSet)
    set: LoksewaMockSet
    @Field()
    setId: string
    @Field()
    score: number
    @Field()
    completed: boolean
    @Field(type => [Answer])
    answers: Answer[]
}