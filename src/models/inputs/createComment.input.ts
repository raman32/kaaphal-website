import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
    @Field()
    body: string;
    @Field()
    userId: string;
    @Field()
    postId: string;
    @Field({ nullable: true })
    parentId: string;
}

@InputType()
export class UpdateCommentInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    body: string;
    @Field({ nullable: true })
    userId: string;
    @Field({ nullable: true })
    postId: string;
    @Field({ nullable: true })
    parentId: string;
}
