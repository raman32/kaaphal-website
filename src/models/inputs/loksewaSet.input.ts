import { Field, InputType } from '@nestjs/graphql';
import { MockSetStatus, MockSetType } from '../loksewaMockSet.model';
@InputType()
export class CreateLoksewaMockSetInput {
    @Field({ description: 'Category for Mock', nullable: true })
    categoryId?: string
    @Field(type => MockSetStatus)
    status: MockSetStatus
    @Field(type => MockSetType)
    type: MockSetType
    @Field({ nullable: true })
    editorId?: string
}
@InputType()
export class UpdateLoksewaMockSetInput {
    @Field()
    id: string
    @Field({ description: 'Category for Mock', nullable: true })
    categoryId?: string
    @Field(type => MockSetStatus)
    status: MockSetStatus
    @Field(type => MockSetType)
    type: MockSetType
    @Field({ nullable: true })
    editorId?: string
}
