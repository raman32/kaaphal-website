import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { File } from './file.model';
import { Post } from './post.model';

@ObjectType()
export class Hotshot extends BaseModel {
    @Field(type => Post, { nullable: true })
    post?: Post
    @Field()
    postId?: string
    @Field(type => File, { nullable: true })
    image?: File
    @Field()
    backgroundColor?: string
    @Field()
    title?: string
    @Field()
    body?: string
}