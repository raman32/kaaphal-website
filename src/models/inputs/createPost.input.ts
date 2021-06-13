import { Field, InputType } from '@nestjs/graphql';
import { Language, PostStatus, PostType } from '../post.model';
@InputType()
export class CreatePostInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    body: string;
    @Field({ nullable: true })
    url: string;
    @Field({ nullable: true })
    slug: string;
    @Field({ nullable: true })
    imageId: string;
    @Field(() => PostStatus, { nullable: true, defaultValue: PostStatus.unverified })
    status: PostStatus;
    @Field(() => PostType, { nullable: true, defaultValue: PostType.articles })
    type: PostType;
    @Field(() => Language, { nullable: true, defaultValue: Language.en })
    language: Language;
    @Field({ nullable: true })
    userId: string;
    @Field({ nullable: true })
    categoryId: string;
    @Field({ nullable: true })
    subCategoryId: string;
    @Field(() => [String], { nullable: 'itemsAndList' })
    tags: string[];


}
