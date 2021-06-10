import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CreateLoksewaMockCategoryInput {
    @Field()
    title: string;
    @Field({ nullable: true })
    titleNP: string;
    @Field(() => Int, { nullable: true, defaultValue: 90 })
    totalMins: number
    @Field(() => Int, { nullable: true, defaultValue: 0 })
    negativeMarkingRatio: number
}
@InputType()
export class UpdateLoksewaMockCategoryInput {
    @Field()
    id: string;
    @Field({ nullable: true })
    title: string;
    @Field({ nullable: true })
    titleNP: string;
    @Field(() => Int, { nullable: true, defaultValue: 90 })
    totalMins: number
    @Field(() => Int, { nullable: true, defaultValue: 0 })
    negativeMarkingRatio: number
}