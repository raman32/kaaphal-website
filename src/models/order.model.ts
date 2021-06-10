import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Advertisement } from './advertisement.model';
import { BaseModel } from './base.model';
import { LoksewaMockSet } from './loksewaMockSet.model';
import { Membership } from './membership.model';
import { User } from './user.model';

export enum PaymentMethod {
    esewa,
    phonepay,
    imepay,
    ipsconnect,
    visa,
    banktransfer,
    cash
}

registerEnumType(PaymentMethod, { name: 'PaymentMethod' })
@ObjectType()
export class Order extends BaseModel {
    @Field(type => User)
    user: User
    @Field()
    userId: string
    @Field(type => LoksewaMockSet, { nullable: true })
    set?: LoksewaMockSet
    @Field()
    setId?: string
    @Field(type => Advertisement, { nullable: true })
    advertsiment?: Advertisement
    @Field()
    advertisementId?: string
    @Field(type => Membership, { nullable: true })
    membership?: Membership
    @Field()
    membershipId?: string
    @Field()
    body?: string
    @Field()
    amountPaid: number
    @Field(type => PaymentMethod)
    paymentMethod?: PaymentMethod
    @Field()
    paymentId?: string
}