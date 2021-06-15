import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

export enum ReactionType {
    like = 'like',
    happy = 'happy',
    dislike = 'dislike',
    sad = 'sad',
    angry = 'angry',
}

registerEnumType(ReactionType, { name: 'ReactionType' })

@ObjectType({ description: 'Major Category for Post' })
export class Reaction extends BaseModel {
    @Field(type => ReactionType)
    type: ReactionType
    @Field(type => Post)
    post: Post
    @Field()
    postId: string
    @Field(type => User)
    user: User
    @Field()
    userId: string
}