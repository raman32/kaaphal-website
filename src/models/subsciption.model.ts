import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { PostType } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Subscription extends BaseModel {
    @Field(type => User)
    user: User
    @Field()
    userId: string
    @Field(type => [PostType])
    postType: PostType[]
    @Field()
    email: boolean
}