import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma.service';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Comment } from '../../../models/comment.model';
import { Notification as Notification_ } from '.prisma/client';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { Ctx } from '../../decorators/requestContext.decorator';
import { RequestContext } from '../../common/requestContext';
import { Notification } from '../../../models/notification.model';
@Resolver(of => Comment)
@UseGuards(GQLGuard)
export class NotificationResolver {
    constructor(
        private readonly prisma: PrismaService) { }

    @Query(() => [Notification])
    @UseGuards(AuthenticatedSessionGuard)
    async getMeNotification(@Ctx() context: RequestContext): Promise<Notification_[]> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        return this.prisma.notification.findMany({ where: { userId: context.user.id }, orderBy: { createdAt: 'desc' }, take: 10 })
    }


    @Mutation(() => Boolean)
    @UseGuards(AuthenticatedSessionGuard)
    async updateMeNotification(@Args({ name: 'notificationId', type: () => String }) notificationId: string, @Ctx() context: RequestContext): Promise<boolean> {
        if (context.user === undefined) {
            throw new UnauthorizedException();
        }
        await this.prisma.notification.update({ where: { id: notificationId }, data: { read: true } })
        return true
    }


}