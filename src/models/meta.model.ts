import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';


@ObjectType()
export class Meta extends BaseModel {
    @Field(() => Post, { nullable: true })
    post?: Post
    @Field()
    postId: string
    @Field()
    name: string
    @Field()
    content: string
}