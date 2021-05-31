import { Field, InputType } from '@nestjs/graphql';
import { PostType } from '../post.model';

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
    image: string;
    @Field(() => PostType, { nullable: true, defaultValue: PostType.articles })
    type: 'articles' | 'scholarships' | 'information' | 'loksewa';
}
