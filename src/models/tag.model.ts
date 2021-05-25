import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';

@ObjectType()
export class Tag extends BaseModel {
    @Field()
    name: string;
    @Field(() => [Post], { nullable: true })
    post: Post[];
}