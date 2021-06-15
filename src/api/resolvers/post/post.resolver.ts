import { Post as Post_, Tag as Tag_ } from '.prisma/client';
import { User as User_ } from '.prisma/client';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { CreatePostInput, UpdatePostInput } from '../../../models/inputs/post.input';
import { PostConnection } from '../../../models/pagination/post-connection';
import { Post, PostStatus, PostType } from '../../../models/post.model';
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
import { Tag } from '../../../models/tag.model';

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
    async getPosts(@Args() { after, before, first, last }: PaginationArgs,
        @Args({ name: 'contains', nullable: true, type: () => String, }) contains?: string,
        @Args({ name: 'type', nullable: true, type: () => PostType, }) type?: PostType,
        @Args({ name: 'status', nullable: true, type: () => PostStatus, }) status?: PostStatus,
        @Args({ name: 'categoryId', nullable: true, type: () => String, }) categoryId?: string,
        @Args({ name: 'subCategoryId', nullable: true, type: () => String, }) subCategoryId?: string,
        @Args({ name: 'userId', nullable: true, type: () => String, }) userId?: string,
        @Args({ name: 'editorId', nullable: true, type: () => String, }) editorId?: string,
    ): Promise<Connection<Post_, Edge<Post_>>> {
        const containsFilter = contains ? [
            { title: { contains } }
        ] : [];
        const ORFilter = containsFilter.length ? {
            OR: [
                ...containsFilter
            ],
        } : null;
        const typeFilter = type ? { type: type } : null
        const categoryFilter = categoryId ? { categoryId: categoryId } : null
        const subCategoryFilter = subCategoryId ? { subCategoryId: subCategoryId } : null
        const statusFilter = status ? { status: status } : null
        const userFilter = userId ? { userId: userId } : null
        const editorFilter = editorId ? { editorId: editorId } : null
        const postCursors = findManyCursorConnection(
            (args) =>
                this.prisma.post.findMany({
                    ...args,
                    where: {
                        ...ORFilter,
                        ...typeFilter,
                        ...categoryFilter,
                        ...subCategoryFilter,
                        ...statusFilter,
                        ...userFilter,
                        ...editorFilter,
                    },
                    include: {
                        tags: true,
                        flags: true,
                        _count: {
                            select: {
                                comments: true,
                            }
                        }


                    },
                }),
            () => this.prisma.post.count(),
            { first, last, before, after },
        );
        return postCursors;
    }

    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createPost(@Args('post') input: CreatePostInput): Promise<Post_> {
        return this.postService.createPost({ ...input })

    }


    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updatePost(@Args('post') input: UpdatePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        return this.postService.updatePost({ ...input, editorId: context.user.id })
    }


    @Mutation(returns => Post)
    @UseGuards(AuthenticatedSessionGuard)
    async createMePost(@Args('post') input: CreatePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        return this.postService.createPost({ ...input, userId: context.user.id })
    }


    @Mutation(returns => Post)
    @UseGuards(AuthenticatedSessionGuard)
    async updateMePost(@Args('post') input: UpdatePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        const { userId } = await this.prisma.post.findUnique({ where: { id: input.id } })
        if (context.user.id !== userId) {
            throw new UnauthorizedException();
        }
        return this.postService.updatePost({ ...input })
    }



    @ResolveField('user', returns => User)
    async user(@Parent() post: Post): Promise<User_> {
        const { userId } = post;
        return this.prisma.user.findUnique({ where: { id: userId } })
    }

}