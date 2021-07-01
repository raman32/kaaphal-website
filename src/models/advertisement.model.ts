import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { File } from './file.model';
import { Order } from './order.model';
import { Post } from './post.model';
import { Tag } from './tag.model';


export enum AdvertisementStatus {
    draft,
    published,
    blocked,
    expired,
    paused
}

export enum AdvertisementTargetSex {
    male,
    female,
    both
}

export enum AdvertisementType {
    banner,
    post,
    splash,
    feeds
}

registerEnumType(AdvertisementStatus, { name: 'AdvertisementStatus' })
registerEnumType(AdvertisementTargetSex, { name: 'AdvertisementTargetSex' })
registerEnumType(AdvertisementType, { name: 'AdvertisementType' })

@ObjectType({ description: 'Model For Advertisement' })
export class Advertisement extends BaseModel {
    @Field()
    startsAt?: Date
    @Field()
    expiresAt?: Date
    @Field(type => AdvertisementType)
    type: AdvertisementType
    @Field(type => [Tag], { nullable: true })
    targetTags: Tag[]
    @Field(type => AdvertisementTargetSex, { nullable: true })
    targetSex?: AdvertisementTargetSex
    @Field({ nullable: true })
    targetAgeLowerLimit?: number
    @Field({ nullable: true })
    targetAgeUpperLimit?: number
    @Field(type => Post)
    post?: Post
    @Field({ nullable: true })
    postId?: string
    @Field(type => File, { nullable: true })
    image?: File
    @Field(type => AdvertisementStatus, { nullable: true })
    status?: AdvertisementStatus
    @Field({ nullable: true })
    backgroundColor?: string
    @Field({ nullable: true })
    title?: string
    @Field({ nullable: true })
    body?: string
    @Field({ nullable: true })
    views?: number
    @Field({ nullable: true })
    clicks?: number
    @Field(type => Order, { nullable: true })
    order?: Order
}