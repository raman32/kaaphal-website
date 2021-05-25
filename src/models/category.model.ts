import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Post } from './post.model';
import { SubCategory } from './subCategory.model';

@ObjectType({ description: 'Major Category for Post' })
export class Category extends BaseModel {
    @Field()
    name: string
    @Field(type => [Post])
    post: Post[]
    @Field(type => [SubCategory])
    subCategories: SubCategory[]
}