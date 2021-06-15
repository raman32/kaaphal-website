import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma.service';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Comment } from '../../../models/comment.model';
import { CommentConnection } from '../../../models/pagination/comment-connection';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { Comment as Comment_ } from '.prisma/client';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { CreateCommentInput, UpdateCommentInput } from '../../../models/inputs/createComment.input';
import { Ctx } from '../../decorators/requestContext.decorator';
import { RequestContext } from '../../common/requestContext';
import { isNonNullType } from 'graphql';
@Resolver(of => Comment)
@UseGuards(GQLGuard)
export class CommentResolver {
    constructor(
        private readonly prisma: PrismaService) { }


    @Query(() => CommentConnection)
    async getComments(@Args() { after, before, first, last, skip }: PaginationArgs,
        @Args({ name: 'postId', type: () => String }) postId: string): Promise<Connection<Comment_, Edge<Comment_>>> {
        const questionConnection = findManyCursorConnection(
            (args) =>
                this.prisma.comment.findMany({ where: { postId: postId }, ...args, skip: skip ? skip : 0, include: { user: { include: { image: { select: { preview: true } } } } } }),
            () => this.prisma.comment.count({ where: { postId: postId } }),
            { first, last, before, after },
        );
        return questionConnection;
    }

    @Mutation(() => Comment)
    @UseGuards(AuthenticatedSessionGuard)
    async createMeComment(@Args('comment') input: CreateCommentInput, @Ctx() context: RequestContext): Promise<Comment_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        return this.prisma.comment.create({ data: { ...input, userId: context.user.id } })
    }
    @Mutation(() => Comment)
    @UseGuards(AuthenticatedSessionGuard)
    async updateMeComment(@Args('comment') input: UpdateCommentInput, @Ctx() context: RequestContext): Promise<Comment_> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        const { userId } = await this.prisma.comment.findUnique({ where: { id: input.id } })
        if (context.user.id !== userId) {
            throw new UnauthorizedException();
        }
        return this.prisma.comment.update({ where: { id: input.id }, data: { body: input.body } })
    }

    @Mutation(() => Boolean)
    @UseGuards(AuthenticatedSessionGuard)
    async deleteMeComment(@Args('comment') input: UpdateCommentInput, @Ctx() context: RequestContext): Promise<boolean> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        const { userId } = await this.prisma.comment.findUnique({ where: { id: input.id } })
        if (context.user.id !== userId) {
            throw new UnauthorizedException();
        }
        try {

            await this.prisma.comment.delete({ where: { id: input.id } })
            return true;
        }
        catch {
            return false;
        }
    }


}