import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MagicLink {
    @Field(() => Boolean)
    status: boolean;
    @Field()
    listener: string;
}