import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { User } from './user.model';

@ObjectType()
export class Follow extends BaseModel {
    @Field(type => User)
    user?: User
    @Field()
    userId?: string
    @Field(type => User)
    following?: User
    @Field()
    followingId?: string
}