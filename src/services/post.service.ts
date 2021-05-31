import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EventBus } from '../event-bus/event-bus';
import { Flag, Post, PostType, Tag, User } from '.prisma/client';
import { CreatePostEvents, UpdatePostEvent } from '../event-bus/events/post.event';

@Injectable()
export class PostService {
    constructor(
        private readonly prisma: PrismaService,
        private eventBus: EventBus,
    ) { }

    async getSinglePost(id: string): Promise<Post & {
        user: User,
        tags: Tag[],
        flag: Flag[],
        _count: {
            comments: number
        }
    }> {
        return this.prisma.post.findUnique({
            where: { id },
            include: {
                user: true,
                tags: true,
                flag: true,
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
    async createPost({ type, title, body, slug, url, userId }: { type: PostType, title: string, body: string, slug: string, url: string, userId: string }): Promise<Post> {
        const post = await this.prisma.post.create({
            data: {
                type,
                title,
                body,
                slug,
                url,
                userId,
            },
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
