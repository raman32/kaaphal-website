import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';

export enum ScholarshipLevel {
    language,
    training,
    research,
    k12,
    bachelors,
    masters,
    phd,
    postgrad
}

registerEnumType(ScholarshipLevel, { name: 'ScholarshipLevel' })

@ObjectType()
export class Scholarship extends BaseModel {
    @Field()
    country?: string
    @Field(type => ScholarshipLevel)
    level: ScholarshipLevel
    @Field()
    startsAt: Date
    @Field()
    deadlineAt: Date
    @Field(type => Post)
    post?: Post
    @Field()
    postId?: string
}