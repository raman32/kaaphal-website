import { Field, InputType } from '@nestjs/graphql';
import { ReactionType } from '../reaction.model';

@InputType()
export class CreateReactionInput {
    @Field(() => ReactionType, { nullable: true })
    type: ReactionType | null;
    @Field()
    postId: string;
}
