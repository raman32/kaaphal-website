import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
    @Field()
    name: string;
    @Field()
    parentId: string;
}
