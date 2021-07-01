import { Post as Post_, Tag as Tag_ } from '.prisma/client';
import { User as User_ } from '.prisma/client';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { CreateMetaInput, CreatePostInput, CreateScholarshipInput, DeletePostInput, UpdateMetaInput, UpdatePostInput } from '../../../models/inputs/post.input';
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
import { Scholarship } from '../../../models/scholarship.model';
import post from '../../../../pages/loksewa/post';
import { meta } from 'eslint/lib/rules/*';

@Resolver(of => Post)
@UseGuards(GQLGuard)
export class PostResolver {
    constructor(
        private readonly postService: PostService,
        private readonly prisma: PrismaService) { }

    @Query(returns => Post, { nullable: true })
    async getPost(@Args('id', { type: () => String }) id: string): Promise<Post_> {
        return this.postService.getSinglePost(id)
    }

    @Query(returns => Post, { nullable: true })
    async getPostFromSlug(@Args('slug', { type: () => String }) id: string): Promise<Post_> {
        return this.postService.getSinglePostFromSlug(id)
    }


    @Query(returns => PostConnection)
    async getPosts(@Args() { after, before, first, last, skip }: PaginationArgs,
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
                        deleted: false,
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
                        editor: true,
                        reactions: true,
                        _count: {
                            select: {
                                comments: true,
                            }
                        }


                    },
                    skip: skip,
                }),
            () => this.prisma.post.count(),
            { first, last, before, after },
        );
        return postCursors;
    }

    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createPost(@Args('post') input: CreatePostInput,
        @Args({ name: 'scholarship', type: () => CreateScholarshipInput, nullable: true }) scholarship: CreateScholarshipInput,
        @Args({ name: 'metas', type: () => [CreateMetaInput], nullable: 'itemsAndList' }) metas: CreateMetaInput[],
        @Ctx() context: RequestContext): Promise<Post_> {
        //TODO move to scholarship and meta service
        if (input.type == PostType.scholarships) {
            const { id } = await this.prisma.scholarship.create({ data: scholarship })
            const post = await this.postService.createPost({ ...input, scholarshipId: id })
            if (metas && metas.length)
                await this.prisma.meta.createMany({
                    data: metas.map(meta => ({ ...meta, postId: post.id })),
                    skipDuplicates: true
                })
            return post;
        }
        const post = await this.postService.createPost({ ...input, editorId: context.user.id })
        if (metas && metas.length)
            await this.prisma.meta.createMany({
                data: metas.map(meta => ({ ...meta, postId: post.id })),
                skipDuplicates: true
            })
        return post;

    }

    @Mutation(returns => Boolean)
    async increaseView(@Args('postId') postId: string): Promise<boolean> {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            return false;
        await this.prisma.post.update({ where: { id: postId }, data: { views: post.views + 1 } })
        return true;
    }

    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updatePost(@Args('post') input: UpdatePostInput,
        @Args({ name: 'scholarship', type: () => CreateScholarshipInput, nullable: true }) scholarship: CreateScholarshipInput,
        @Args({ name: 'metas', type: () => [UpdateMetaInput], nullable: 'itemsAndList' }) metas: UpdateMetaInput[],
        @Ctx() context: RequestContext): Promise<Post_> {
        if (input.type == PostType.scholarships) {
            await this.prisma.scholarship.updateMany({ where: { postId: input.id }, data: scholarship })
            console.log(metas)
            if (metas && metas.length)
                //TODO BUG!!! FIX WITH BATCH TRANSACTION
                await this.prisma.meta.updateMany({
                    data: metas.map(meta => ({ ...meta })),
                })
        }
        return this.postService.updatePost({ ...input, editorId: context.user.id })
    }

    @Mutation(returns => Post)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async deletePost(@Args('post') input: DeletePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        return this.prisma.post.update({ where: { id: input.id }, data: { deleted: true, editorId: context.user.id } })
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



    @Mutation(returns => Post)
    @UseGuards(AuthenticatedSessionGuard)
    async deleteMePost(@Args('post') input: DeletePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        const { userId } = await this.prisma.post.findUnique({ where: { id: input.id } })
        if (context.user.id !== userId) {
            throw new UnauthorizedException();
        }
        return this.prisma.post.update({ where: { id: input.id }, data: { deleted: true } })
    }


    @ResolveField('user', returns => User)
    async user(@Parent() post: Post): Promise<User_> {
        const { userId } = post;
        return this.prisma.user.findUnique({ where: { id: userId }, include: { image: true } })
    }

}