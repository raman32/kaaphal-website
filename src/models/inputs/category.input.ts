import { Field, InputType } from '@nestjs/graphql';
import { PostType } from '../post.model';

@InputType()
export class CreateCategoryInput {
    @Field()
    name: string;
    @Field(type => PostType)
    parentType: PostType
}

@InputType()
export class UpdateCategoryInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    name: string;
    @Field(type => PostType, { nullable: true })
    parentType: PostType
}
