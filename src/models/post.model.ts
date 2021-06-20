import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Advertisement } from './advertisement.model';
import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Comment } from './comment.model';
import { File } from './file.model';
import { Flag } from './flag.model';
import { Hotshot } from './hotshot.model';
import { Meta } from './meta.model';
import { Reaction } from './reaction.model';
import { Scholarship } from './scholarship.model';
import { SubCategory } from './subCategory.model';
import { Tag } from './tag.model';
import { User } from './user.model';


export enum PostType {
    articles = 'articles',
    scholarships = 'scholarships',
    information = 'information',
    loksewa = 'loksewa'
}

export enum PostStatus {
    draft = 'draft',
    unverified = 'unverified',
    commented = 'commented',
    verified = 'verified',
    published = 'published',
    hidden = 'hidden',
    blocked = 'blocked'
}

export enum Language {
    np = 'np',
    en = 'en'
}


registerEnumType(PostStatus, { name: 'PostStatus' })
registerEnumType(PostType, { name: 'PostType' })
registerEnumType(Language, { name: 'Language' })

@ObjectType({ description: 'Post model' })
export class Post extends BaseModel {
    @Field({ nullable: true })
    publishedAt?: Date
    @Field()
    slug: string
    @Field({ nullable: true })
    body?: string
    @Field({ nullable: true })
    url?: string
    @Field({ nullable: true })
    excerpt?: string
    @Field()
    title: string
    @Field(() => Language)
    language: Language
    @Field(() => User, { nullable: true })
    user?: User
    @Field({ nullable: true })
    userId?: string
    @Field()
    deleted: boolean
    @Field(() => PostStatus)
    status: PostStatus
    @Field(() => [Comment])
    comments: Comment[]
    @Field(() => File, { nullable: true })
    image?: File
    @Field(() => [Tag])
    tags: Tag[]
    @Field(() => [Reaction], { nullable: true })
    reactions: Reaction[]
    @Field(() => PostType)
    type: PostType
    @Field(() => [Flag], { nullable: 'itemsAndList' })
    flag: Flag[]
    @Field()
    views: number
    @Field(() => User, { nullable: true })
    editor?: User
    @Field({ nullable: true })
    editorId?: string
    @Field(() => Category, { nullable: true })
    category?: Category
    @Field({ nullable: true })
    categoryId?: string
    @Field(() => SubCategory, { nullable: true })
    subCategory?: SubCategory
    @Field({ nullable: true })
    subCategoryId?: string
    @Field(() => Advertisement, { nullable: true })
    advertisement?: Advertisement
    @Field(() => Hotshot, { nullable: true })
    hotShot?: Hotshot
    @Field(() => Scholarship, { nullable: true })
    scholarship?: Scholarship
    @Field(() => [Meta], { nullable: 'itemsAndList' })
    metas: Meta[]
    @Field({ nullable: true })
    HTMLTitle?: string
}