import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
    @Field()
    name: string;
    @Field()
    parentId: string;
}

@InputType()
export class UpdateSubCategoryInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    name: string;
    @Field({ nullable: true })
    parentId: string;
}
