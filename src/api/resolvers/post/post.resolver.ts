import { Post as Post_ } from '.prisma/client';
import { User as User_ } from '.prisma/client';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { CreatePostInput } from '../../../models/inputs/createPost.input';
import { PostConnection } from '../../../models/pagination/post-connection';
import { Post } from '../../../models/post.model';
import { User, UserRole } from '../../../models/user.model';
import { PostService } from '../../../services/post.service';
import { PrismaService } from '../../../services/prisma.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';
import { Roles } from '../../decorators/role.decorator';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { GQLGuard } from '../auth/guards/gql.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver(of => Post)
@UseGuards(GQLGuard)
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly prisma: PrismaService) { }

    @Query(returns => Post)
    async getPost(@Args('id', { type: () => String }) id: string): Promise<Post_> {
        return this.postService.getSinglePost(id)
    }

    @Query(returns => PostConnection)
    async getPosts(@Args() { after, before, first, last }: PaginationArgs): Promise<Connection<Post_, Edge<Post_>>> {
        const postCursors = findManyCursorConnection(
            (args) =>
                this.prisma.post.findMany({
                    ...args,
                }),
            () => this.prisma.post.count(),
            { first, last, before, after },
        );
        return postCursors;
    }

    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createPost(@Args('post') input: CreatePostInput, @Args('userId') id: string): Promise<Post_> {
        return this.postService.createPost({ type: input.type, body: input.body, slug: input.slug, title: input.title, url: input.url, userId: id })
    }

    @Mutation(returns => Post)
    @UseGuards(AuthenticatedSessionGuard)
    async createMePost(@Args('post') input: CreatePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        return this.postService.createPost({ type: input.type, body: input.body, slug: input.slug, title: input.title, url: input.url, userId: context.user.id })
    }

    @ResolveField('user', returns => User)
    async user(@Parent() post: Post): Promise<User_> {
        const { userId } = post;
        return this.prisma.user.findUnique({ where: { id: userId } })
    }

}