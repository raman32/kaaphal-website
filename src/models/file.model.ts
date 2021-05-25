import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { User } from './user.model';

@ObjectType()
export class File extends BaseModel {
    @Field()
    name: string;
    @Field()
    preview: string;
    @Field()
    source: string;
    @Field()
    size: number;
    @Field()
    width: number;
    @Field()
    height: number;
    @Field(() => User, { nullable: true })
    user?: User;
    @Field(() => Post, { nullable: true })
    post?: Post;
}