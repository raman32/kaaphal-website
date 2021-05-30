import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Comment } from './comment.model';
import { File } from './file.model';
import { Flag } from './flag.model';
import { Follow } from './follow.model';
import { LoksewaMockSet } from './loksewaMockSet';
import { LoksewaTest } from './loksewaTest.model';
import { Membership } from './membership.model';
import { Notification } from './notification.model';
import { Order } from './order.model';
import { Post } from './post.model';
import { Reaction } from './reaction.model';
import { Session } from './session.model';
import { Subscription } from './subsciption.model';

export enum UserStatus {
    active,
    blocked,
    inactive
}

export enum UserRole {
    admin = 'admin',
    moderator = 'moderator',
    user = 'user'
}

registerEnumType(UserStatus, { name: 'UserStatus' })
registerEnumType(UserRole, { name: 'UserRole' })

@ObjectType({ description: 'User Model' })
export class User extends BaseModel {
    @Field()
    email: string
    @Field()
    firstName: string
    @Field({ nullable: true })
    middleName?: string
    @Field({ nullable: true })
    lastName?: string
    @Field({ nullable: true })
    displayName?: string
    @Field(type => UserStatus)
    status: UserStatus
    @Field(type => File, { nullable: true })
    image?: File
    @Field(type => Comment, { nullable: true })
    comments: Comment[]
    @Field(type => [Post], { nullable: true })
    posts: Post[]
    @Field(type => [Reaction], { nullable: true })
    reactions: Reaction[]
    @Field(type => UserRole)
    role: UserRole
    @Field(type => [Flag], { nullable: true })
    moderatorFlag: Flag[]
    @Field(type => [Flag])
    flag: Flag[]
    @Field(type => [Follow], { nullable: true })
    following: Follow[]
    @Field(type => [Follow], { nullable: true })
    followers: Follow[]
    @Field()
    deleted: boolean
    @Field(type => [Session])
    session: Session[]
    @Field(type => [Post], { nullable: true })
    editedPosts: Post[]
    @Field(type => [LoksewaMockSet], { nullable: true })
    editedLoksewaMockSet: LoksewaMockSet[]
    @Field(type => [LoksewaTest], { nullable: true })
    loksewaTest: LoksewaTest[]
    @Field(type => [Order], { nullable: true })
    orders: Order[]
    @Field(type => Membership, { nullable: true })
    membership?: Membership
    @Field(type => Subscription, { nullable: true })
    subcription?: Subscription
    @Field(type => [Notification])
    notifications: Notification[]
}