import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Advertisement } from './advertisement.model';
import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Comment } from './comment.model';
import { File } from './file.model';
import { Flag } from './flag.model';
import { Hotshot } from './hotshot.model';
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
    draft,
    unverified,
    commented,
    verified,
    published,
    hidden,
    blocked
}

export enum Language {
    np,
    en
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
    @Field()
    title: string
    @Field(type => Language)
    language: Language
    @Field(type => User, { nullable: true })
    user?: User
    @Field({ nullable: true })
    userId?: string
    @Field()
    deleted: boolean
    @Field(type => PostStatus)
    status: PostStatus
    @Field(type => [Comment])
    comments: Comment[]
    @Field(type => File, { nullable: true })
    image?: File
    @Field(type => [Tag])
    tags: Tag[]
    @Field(type => [Reaction], { nullable: true })
    reactions: Reaction[]
    @Field(type => PostType)
    type: PostType
    @Field(type => [Flag])
    flag: Flag[]
    @Field()
    views: number
    @Field(type => User, { nullable: true })
    editor?: User
    @Field({ nullable: true })
    editorId?: string
    @Field(type => Category, { nullable: true })
    category?: Category
    @Field({ nullable: true })
    categoryId?: string
    @Field(type => SubCategory, { nullable: true })
    subCategory?: SubCategory
    @Field({ nullable: true })
    subCategoryId?: string
    @Field(type => Advertisement, { nullable: true })
    advertisement?: Advertisement
    @Field(type => Hotshot, { nullable: true })
    hotShot?: Hotshot
    @Field(type => Scholarship, { nullable: true })
    scholarship?: Scholarship
}