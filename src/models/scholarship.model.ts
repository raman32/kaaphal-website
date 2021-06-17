import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';

export enum ScholarshipLevel {
    language = 'language',
    training = 'training',
    research = 'research',
    k12 = 'k12',
    bachelors = 'bachelors',
    masters = 'masters',
    phd = 'phd',
    postgrad = 'postgrad'
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