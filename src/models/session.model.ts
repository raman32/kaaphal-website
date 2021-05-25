import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
export class Session extends BaseModel {
    @Field()
    type: 'AUTHENTICATED' | 'ANONYMOUS' | 'MAGIC';
    @Field()
    token: string;
    @Field()
    authToken: string;
    @Field()
    refreshToken: string;
    @Field()
    expires: Date;
    @Field()
    invalidate: boolean;
    @Field(() => User, { nullable: true })
    user: User;
    @Field({ nullable: true })
    googleToken: string;
    @Field({ nullable: true })
    githubToken: string;
    @Field({ nullable: true })
    facebookToken: string;
}