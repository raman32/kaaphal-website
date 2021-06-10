import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaMockCategory } from './loksewaMockCategory.model';
import { LoksewaTest } from './loksewaTest.model';
import { MockQuestionEdge } from './mockQuestionEdge.model';
import { Order } from './order.model';
import { User } from './user.model';

export enum MockSetType {
    free = 'free',
    official = 'official',
    trial = 'trial',
    premium = 'premium',
}

export enum MockSetStatus {
    draft = 'draft',
    published = 'published',
    hidden = 'hidden',
}

registerEnumType(MockSetType, { name: 'MockSetType' })
registerEnumType(MockSetStatus, { name: 'MockSetStatus' })

@ObjectType()
export class LoksewaMockSet extends BaseModel {
    @Field(type => [MockQuestionEdge])
    questions: MockQuestionEdge[]
    @Field(type => LoksewaMockCategory, { nullable: true })
    category?: LoksewaMockCategory
    @Field({ nullable: true })
    categoryId?: string
    @Field(type => MockSetStatus)
    status: MockSetStatus
    @Field(type => MockSetType)
    type: MockSetType
    @Field(type => User, { nullable: true })
    editor?: User
    @Field({ nullable: true })
    editorId?: string
    @Field(type => [LoksewaTest])
    loksewaTest: LoksewaTest[]
    @Field(type => [Order])
    orders: Order[]
}