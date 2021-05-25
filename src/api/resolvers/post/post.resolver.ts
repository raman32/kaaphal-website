import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../../../models/post.model';
import { PrismaService } from '../../../services/prisma.service';

@Resolver(of => Post)
export class PostResolver {
    constructor(private prisma: PrismaService) { }

    @Query(returns => Post)
    async post(@Args('id', { type: () => String }) id: string) {
        return this.prisma.post.findUnique({ where: { id: id } })
    }

}