import { Field, InputType, Int } from '@nestjs/graphql';
import { Answer } from '../answer.model';
@InputType()
export class CreateLoksewaTest {
    @Field()
    userId: string;
    @Field()
    setId: string;
    @Field(() => Int)
    score: number;
    @Field(() => Boolean)
    completed: boolean;
    @Field(() => [Answer])
    answers: Answer[];

}