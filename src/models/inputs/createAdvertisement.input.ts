import { Field, InputType } from '@nestjs/graphql';
import { AdvertisementStatus, AdvertisementTargetSex, AdvertisementType } from '../advertisement.model';
import { Tag } from '../tag.model';

@InputType()
export class CreateAdvertisementInput {
    @Field()
    startsAt?: Date
    @Field()
    expiresAt?: Date
    @Field(type => AdvertisementType)
    type: AdvertisementType
    @Field(type => [Tag], { nullable: 'itemsAndList' })
    targetTags: Tag[]
    @Field(type => AdvertisementTargetSex, { nullable: true })
    targetSex?: AdvertisementTargetSex
    @Field({ nullable: true })
    targetAgeLowerLimit?: number
    @Field({ nullable: true })
    targetAgeUpperLimit?: number
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
}
