import { Reaction as Reaction_, } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from '../../../services/post.service';
import { PrismaService } from '../../../services/prisma.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Reaction } from '../../../models/reaction.model';
import { CreateReactionInput } from '../../../models/inputs/createReaction.input';

@Resolver(of => Reaction)
@UseGuards(GQLGuard)
export class ReactionResolver {
    constructor(
        private readonly postService: PostService,
        private readonly prisma: PrismaService) { }


    @Query(returns => Reaction, { nullable: true })
    @UseGuards(AuthenticatedSessionGuard)
    async getMeReaction(@Args('postId') postId: string, @Ctx() context: RequestContext): Promise<Reaction_> {
        return this.prisma.reaction.findUnique({ where: { postId_userId: { postId, userId: context.user.id } } })
    }

    @Mutation(returns => Boolean)
    @UseGuards(AuthenticatedSessionGuard)
    async reactToPost(@Args('reaction') reaction: CreateReactionInput,
        @Ctx() context: RequestContext): Promise<boolean> {

        try {
            if (!reaction.type) {
                await this.prisma.reaction.delete({
                    where: {
                        postId_userId: { postId: reaction.postId, userId: context.user.id }
                    }
                })
                return true;
            }
            await this.prisma.reaction.upsert({
                where: {
                    postId_userId: { postId: reaction.postId, userId: context.user.id }
                },
                create: {
                    type: reaction.type,
                    postId: reaction.postId,
                    userId: context.user.id
                },
                update: {
                    type: reaction.type,
                    postId: reaction.postId,
                    userId: context.user.id
                }
            })

            return true;
        }
        catch {
            return false;
        }
    }

}