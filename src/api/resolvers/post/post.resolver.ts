import { Post as PostType } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../../../models/post.model';
import { PrismaService } from '../../../services/prisma.service';
import { GQLAuthGuard } from '../auth/guards/auth.guard';

@Resolver(of => Post)
@UseGuards(GQLAuthGuard)
export class PostResolver {
    constructor(private prisma: PrismaService) { }

    @Query(returns => Post)
    async getPost(@Args('id', { type: () => String }) id: string): Promise<PostType> {
        return this.prisma.post.findUnique({ where: { id: id } })
    }

}