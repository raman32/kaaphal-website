import { Field, InputType } from '@nestjs/graphql';
import { Meta } from '../meta.model';
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
    @Field({ nullable: true })
    HTMLTitle?: string

}

@InputType()
export class UpdatePostInput extends CreatePostInput {
    @Field()
    id: string;
}

@InputType()
export class DeletePostInput {
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

@InputType()
export class CreateMetaInput {
    @Field({ nullable: true })
    postId: string
    @Field()
    name: string
    @Field()
    content: string
}


@InputType()
export class UpdateMetaInput {
    //TODO FIX THIS 
    @Field({ nullable: true })
    id: string
    @Field({ nullable: true })
    postId: string
    @Field()
    name: string
    @Field()
    content: string
}

