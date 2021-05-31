import { Post as Post_ } from '.prisma/client';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from '../../../models/inputs/createPost.input';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { PrismaService } from '../../../services/prisma.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';
import { GQLGuard } from '../auth/guards/gql.guard';

@Resolver(of => Post)
@UseGuards(GQLGuard)
export class PostResolver {
    constructor(
        private readonly postService: PostService) { }

    @Query(returns => Post)
    async getPost(@Args('id', { type: () => String }) id: string): Promise<Post_> {
        return this.postService.getSinglePost(id)
    }

    @Mutation(returns => Post)
    async createPost(@Args('post') input: CreatePostInput, @Args('userId') id: string): Promise<Post_> {
        return this.postService.createPost({ type: input.type, body: input.body, slug: input.slug, title: input.title, url: input.url, userId: id })
    }

    @Mutation(returns => Post)
    async createMePost(@Args('post') input: CreatePostInput, @Ctx() context: RequestContext): Promise<Post_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        return this.postService.createPost({ type: input.type, body: input.body, slug: input.slug, title: input.title, url: input.url, userId: context.user.id })
    }

}