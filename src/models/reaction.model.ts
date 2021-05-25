import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

export enum ReactionType {
    like,
    happy,
    dislike,
    sad,
    angry,
}

registerEnumType(ReactionType, { name: 'ReactionType' })

@ObjectType({ description: 'Major Category for Post' })
export class Reaction extends BaseModel {
    @Field(type => ReactionType)
    type: ReactionType
    @Field(type => Post, { nullable: true })
    post?: Post
    @Field({ nullable: true })
    postId?: string
    @Field(type => User, { nullable: true })
    user?: User
    @Field({ nullable: true })
    userId?: string
}