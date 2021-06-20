import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventBus } from '../event-bus/event-bus';
import { Flag, Post, PostType, Tag, User } from '.prisma/client';
import { CreatePostEvents, UpdatePostEvent } from '../event-bus/events/post.event';
import { Language, PostStatus } from '../models/post.model';
import { randomUUID } from 'crypto';
import { NotificationEvent } from '../event-bus/events/notification.event';
import { host } from '../../utils/GlobalConstants';
import { MagicLinkEvent, MagicLinkVerificationEvent } from '../event-bus/events';
import moment from 'moment';
import { Meta } from '../models/meta.model';

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,
        private eventBus: EventBus,
    ) { }

    async getSinglePost(id: string): Promise<Post> {
        return this.prisma.post.findUnique({
            where: { id },
            include: {
                user: true,
                tags: true,
                flags: true,
                metas: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
    }

    async getSinglePostFromSlug(slug: string): Promise<Post> {
        return this.prisma.post.findUnique({
            where: { slug: slug }, include: {
                user: { include: { image: true } }, comments: {
                    where: { parentId: null },
                    include: { user: true }
                },
                tags: true,
                reactions: true,
                metas: true,
                _count: {
                    select: {
                        comments: true,
                    },
                },
            }
        })
    }

    async getTopPost(
        type: PostType,
        orderBy = {},
        include = {},
        take = 10,
    ): Promise<Post[]> {
        const topPosts = await this.prisma.post.findMany({
            take: take,
            where: {
                type: type,
            },
            orderBy: orderBy,
            include: include,
        });
        return topPosts;
    }
    async createPost({ type, title, body, excerpt, slug, url, userId, categoryId, language, subCategoryId, status, tags, editorId, imageId, scholarshipId, HTMLTitle }:
        { type: PostType, title: string, body: string, excerpt?: string, slug: string, url: string, userId: string, categoryId: string, language: Language, subCategoryId: string, status: PostStatus, tags?: string[], editorId?: string, imageId?: string, scholarshipId?: string, HTMLTitle?: string }):
        Promise<Post> {

        const post = await this.prisma.post.create({
            data: {
                type: type ? type : 'articles',
                title,
                body,
                excerpt: excerpt ? excerpt : undefined,
                slug: slug ? slug : randomUUID(),
                url: url ? url : undefined,
                user: { connect: { id: userId } },
                category: categoryId ? { connect: { id: categoryId } } : undefined,
                language: language ? language : 'en',
                subCategory: subCategoryId ? { connect: { id: subCategoryId } } : undefined,
                status: status ? status : 'draft',
                tags: tags && tags.length ? { connect: tags.map(tag => ({ id: tag })) } : undefined,
                image: imageId ? { connect: { id: imageId } } : undefined,
                scholarship: scholarshipId ? { connect: { id: scholarshipId } } : undefined,
                editor: editorId ? { connect: { id: editorId } } : undefined,
                HTMLTitle: HTMLTitle ? HTMLTitle : 'Kaaphal Articles | ' + title,
            }
        });

        this.eventBus.publish(new NotificationEvent('Your Article has been submitted for verification purpose. Click to see the preview',
            post.userId,
            post.slug,
            post.id
        ));
        return post;
    }

    async updatePost({ id, type, title, body, excerpt, slug, url, categoryId, language, subCategoryId, status, tags, imageId, editorId, scholarshipId, HTMLTitle }: { id: string, type: PostType, title: string, body: string, excerpt?: string, slug: string, url?: string, categoryId: string, language: Language, subCategoryId: string, status: PostStatus, tags?: string[], imageId?: string, editorId?: string, scholarshipId?: string, HTMLTitle?: string }): Promise<Post> {
        //TODO move excerpt validation to client side
        const updatedPost = await this.prisma.post.update({
            where: {
                id,
            },
            data: {
                type: type ? type : 'articles',
                title,
                body,
                excerpt: excerpt ? excerpt : status === PostStatus.published && body ? body.substring(0, 200).replace(/(<([^>]+)>)/ig, '') : undefined,
                slug: slug ? slug : randomUUID(),
                url: url ? url : undefined,
                category: categoryId ? { connect: { id: categoryId } } : undefined,
                language: language ? language : 'en',
                subCategory: subCategoryId ? { connect: { id: subCategoryId } } : undefined,
                status: status ? status : 'draft',
                tags: tags && tags.length ? { connect: tags.map(tag => ({ id: tag })) } : undefined,
                image: imageId ? { connect: { id: imageId } } : undefined,
                editor: editorId ? { connect: { id: editorId } } : undefined,
                publishedAt: status === PostStatus.published ? moment().toISOString() : undefined,
                scholarship: scholarshipId ? { connect: { id: scholarshipId } } : undefined,
                HTMLTitle: HTMLTitle ? HTMLTitle : 'Kaaphal Articles | ' + title,
            },
        });

        //this.eventBus.publish(new UpdatePostEvent(updatedPost));
        switch (status) {
            case PostStatus.unverified:
                this.eventBus.publish(new NotificationEvent('Your Article has been submitted for verification purpose. Click to see the preview',
                    updatedPost.userId,
                    updatedPost.slug,
                    updatedPost.id
                ));
                break;
            case PostStatus.published:
                this.eventBus.publish(new NotificationEvent('Your Article has ' + updatedPost.title + ' been published',
                    updatedPost.userId,
                    updatedPost.slug,
                    updatedPost.id
                ));
                break;
            case PostStatus.blocked:
                this.eventBus.publish(new NotificationEvent('Your Article has ' + updatedPost.title + ' been Blocked. You can see the reasons for blocking on your profile',
                    updatedPost.userId,
                    updatedPost.slug,
                    updatedPost.id
                ));
                break;
        }
        return updatedPost;
    }
}
