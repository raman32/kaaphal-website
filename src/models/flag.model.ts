import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

export enum FlagType {
    fakenews,
    politicalcontent,
    religiouscontent,
    sexualcontent,
    slander,
    outdated,
    other
}
export enum FlagStatus {
    submitted,
    inreview,
    solved
}

registerEnumType(FlagType, { name: 'FlagType' })
registerEnumType(FlagStatus, { name: 'FlagStatus' })

@ObjectType()
export class Flag extends BaseModel {
    @Field(type => FlagType)
    type: FlagType
    @Field()
    message?: string
    @Field(type => FlagStatus)
    status: FlagStatus
    @Field(type => User)
    moderator?: User
    @Field()
    moderatorId?: string
    @Field(type => User)
    user?: User
    @Field()
    userId?: string
    @Field(type => Post)
    post?: Post
    @Field()
    postId?: string
}