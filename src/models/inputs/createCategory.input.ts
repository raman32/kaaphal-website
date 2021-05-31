import { PostType } from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    body: string;
    @Field({ nullable: true })
    url: string;
    @Field({ nullable: true })
    image: string;
    @Field(() => PostType, { nullable: true, defaultValue: 'article' })
    type: PostType;
}
