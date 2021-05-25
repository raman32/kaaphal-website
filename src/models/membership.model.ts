import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Order } from './order.model';
import { User } from './user.model';
export enum MembershipType {
    gold,
    silver,
    bronze
}

registerEnumType(MembershipType, { name: 'MembershipType' })

@ObjectType()
export class Membership extends BaseModel {
    @Field(type => User)
    user: User
    @Field()
    userId: string
    @Field()
    expiresAt: Date
    @Field(type => MembershipType)
    type: MembershipType
    @Field(type => Order)
    order?: Order
}