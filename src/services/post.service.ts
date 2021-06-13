import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventBus } from '../event-bus/event-bus';
import { Flag, Post, PostType, Tag, User } from '.prisma/client';
import { CreatePostEvents, UpdatePostEvent } from '../event-bus/events/post.event';
import { Language, PostStatus } from '../models/post.model';

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
                type,
                title,
                body,
                slug,
                url,
                user: { connect: { id: userId } },
                category: { connect: { id: categoryId } },
                language,
                subCategory: { connect: { id: subCategoryId } },
                status,
                tags: tags.length ? { connect: tags.map(tag => ({ id: tag })) } : undefined,
                image: imageId ? { connect: { id: imageId } } : undefined,
            }
        });
        this.eventBus.publish(new CreatePostEvents(post));
        return post;
    }

    async updatePost({ id, title, body, url }: { id: string, title: string, body: string, url: string }): Promise<Post> {
        const updatedPost = await this.prisma.post.update({
            where: {
                id,
            },
            data: {
                title,
                body,
                url,
            },
        });
        this.eventBus.publish(new UpdatePostEvent(updatedPost));
        return updatedPost;
    }
}
