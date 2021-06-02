import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Post } from './post.model';

@ObjectType({ description: 'Sub Category for Post' })
export class SubCategory extends BaseModel {
    @Field()
    name: string
    @Field(type => [Post])
    posts: Post[]
    @Field(type => Category, { nullable: true })
    parent?: Category
    @Field({ nullable: true })
    parentId?: string
}