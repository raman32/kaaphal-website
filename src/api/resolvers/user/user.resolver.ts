import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User, UserRole } from '../../../models/user.model';
import { UseGuards } from '@nestjs/common';
import { GQLGuard } from '../auth/guards/gql.guard';
import { PrismaService } from '../../../services/prisma.service';
import { User as User_ } from 'prisma/prisma-client'
import { Post as Post_ } from 'prisma/prisma-client'
import { UserService } from '../../../services/user.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';
import { Roles } from '../../decorators/role.decorator';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Post } from '../../../models/post.model';
import { UserConnection } from '../../../models/pagination/user-connection';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

@Resolver((of) => User)
@UseGuards(GQLGuard)
export class UserResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }


    @Query((returns) => User, { nullable: true })
    @UseGuards(AuthenticatedSessionGuard)
    async me(@Ctx() context: RequestContext,): Promise<User_> {
        return context.user;
    }

    @Query((returns) => UserConnection)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async getUsers(@Args() { after, before, first, last }: PaginationArgs): Promise<Connection<User_, Edge<User_>>> {
        const userCursors = findManyCursorConnection(
            (args) =>
                this.prisma.user.findMany({
                    ...args,
                }),
            () => this.prisma.post.count(),
            { first, last, before, after },
        );
        return userCursors;
    }

    @ResolveField('posts', (returns) => [Post], { nullable: true })
    async posts(@Parent() user: User): Promise<Post_[]> {
        const { id } = user;
        return this.prisma.post.findMany({ where: { userId: id } })
    }

}
