import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventBus } from '../event-bus/event-bus';
import { Flag, Post, PostType, Tag, User } from '.prisma/client';
import { CreatePostEvents, UpdatePostEvent } from '../event-bus/events/post.event';
import { Language, PostStatus } from '../models/post.model';
import { randomUUID } from 'crypto';
import { NotificationEvent } from '../event-bus/events/notification.event';
import { host } from '../../utils/GlobalConstants';
import { MagicLinkEvent, MagicLinkVerificationEvent } from '../event-bus/events';

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
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
        });
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
    async createPost({ type, title, body, slug, url, userId, categoryId, language, subCategoryId, status, tags, imageId }:
        { type: PostType, title: string, body: string, slug: string, url: string, userId: string, categoryId: string, language: Language, subCategoryId: string, status: PostStatus, tags?: string[], imageId?: string }):
        Promise<Post> {

        const post = await this.prisma.post.create({
            data: {
                type: type ? type : 'articles',
                title,
                body,
                slug: slug ? slug : randomUUID(),
                url: url ? url : undefined,
                user: { connect: { id: userId } },
                category: { connect: { id: categoryId } },
                language: language ? language : 'en',
                subCategory: subCategoryId ? { connect: { id: subCategoryId } } : undefined,
                status: status ? status : 'draft',
                tags: tags.length ? { connect: tags.map(tag => ({ id: tag })) } : undefined,
                image: imageId ? { connect: { id: imageId } } : undefined,
            }
        });

        this.eventBus.publish(new NotificationEvent('Your Article has been submitted for verification purpose. Click to see the preview',
            post.userId,
            post.slug,
            post.id
        ));
        return post;
    }

    async updatePost({ id, type, title, body, slug, url, categoryId, language, subCategoryId, status, tags, imageId }: { id: string, type: PostType, title: string, body: string, slug: string, url?: string, categoryId: string, language: Language, subCategoryId: string, status: PostStatus, tags?: string[], imageId?: string }): Promise<Post> {
        const updatedPost = await this.prisma.post.update({
            where: {
                id,
            },
            data: {
                type: type ? type : 'articles',
                title,
                body,
                slug: slug ? slug : randomUUID(),
                url: url ? url : undefined,
                category: { connect: { id: categoryId } },
                language: language ? language : 'en',
                subCategory: subCategoryId ? { connect: { id: subCategoryId } } : undefined,
                status: status ? status : 'draft',
                tags: tags.length ? { connect: tags.map(tag => ({ id: tag })) } : undefined,
                image: imageId ? { connect: { id: imageId } } : undefined,
            },
        });

        //this.eventBus.publish(new UpdatePostEvent(updatedPost));
        this.eventBus.publish(new NotificationEvent('Your Article has been submitted for verification purpose. Click to see the preview',
            updatedPost.userId,
            updatedPost.slug,
            updatedPost.id
        ));
        return updatedPost;
    }
}
