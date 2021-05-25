import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Notification extends BaseModel {
    @Field(type => Post)
    post?: Post
    @Field()
    postId?: string
    @Field(type => User)
    user: User
    @Field()
    userId: string
    @Field()
    body?: string
    @Field()
    read: boolean
}