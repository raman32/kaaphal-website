import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post, PostType } from './post.model';
import { SubCategory } from './subCategory.model';

@ObjectType({ description: 'Major Category for Post' })
export class Category extends BaseModel {
    @Field()
    name: string
    @Field(type => [Post])
    posts: Post[]
    @Field(type => [SubCategory])
    subCategories: SubCategory[]
    @Field(type => PostType)
    parentType: PostType
}