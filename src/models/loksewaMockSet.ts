import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { LoksewaMockCategory } from './loksewaMockCategory.model';
import { LoksewaQuestion } from './loksewaQuestion.model';
import { LoksewaTest } from './loksewaTest.model';
import { Order } from './order.model';
import { User } from './user.model';

export enum MockSetType {
    free,
    official,
    premium,
}

export enum MockSetStatus {
    draft,
    published,
    hidden,
}

registerEnumType(MockSetType, { name: 'MockSetType' })
registerEnumType(MockSetStatus, { name: 'MockSetStatus' })

@ObjectType()
export class LoksewaMockSet extends BaseModel {
    @Field(type => [LoksewaQuestion])
    questions: LoksewaQuestion[]
    @Field(type => LoksewaMockCategory)
    category?: LoksewaMockCategory
    @Field()
    categoryId?: string
    @Field(type => MockSetStatus)
    status: MockSetStatus
    @Field(type => MockSetType)
    type: MockSetType
    @Field(type => User)
    editor?: User
    @Field()
    editorId?: string
    @Field(type => [LoksewaTest])
    loksewaTest: LoksewaTest[]
    @Field(type => [Order])
    orders: Order[]
}