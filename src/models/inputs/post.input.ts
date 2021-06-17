import { Field, InputType } from '@nestjs/graphql';
import { Language, PostStatus, PostType } from '../post.model';
import { ScholarshipLevel } from '../scholarship.model';
@InputType()
export class CreatePostInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    body: string;
    @Field({ nullable: true })
    url: string;
    @Field({ nullable: true })
    excerpt: string;
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

@InputType()
export class UpdatePostInput extends CreatePostInput {
    @Field()
    id: string;
}

@InputType()
export class CreateScholarshipInput {
    @Field({ nullable: true })
    country: string
    @Field(type => ScholarshipLevel)
    level: ScholarshipLevel
    @Field({ nullable: true })
    startsAt: Date
    @Field({ nullable: true })
    deadlineAt: Date
}