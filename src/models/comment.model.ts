import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class Comment extends BaseModel {
    @Field()
    body: string;
    @Field(() => [Comment], { nullable: true })
    children: Comment[];
    @Field(() => Comment, { nullable: true })
    parent: Comment;
    @Field({ nullable: true })
    parentId: string;
    @Field()
    userId: string;
    @Field(() => User, { nullable: true })
    user: User;
    @Field()
    postId: string;
    @Field(() => Post, { nullable: true })
    post: Post;
}