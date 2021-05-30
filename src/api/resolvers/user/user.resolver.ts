import { Query, Resolver } from '@nestjs/graphql';
import { User, UserRole } from '../../../models/user.model';
import { UseGuards } from '@nestjs/common';
import { GQLGuard } from '../auth/guards/gql.guard';
import { PrismaService } from '../../../services/prisma.service';
import { User as UserType } from 'prisma/prisma-client'
import { UserService } from '../../../services/user.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';
import { Roles } from '../../decorators/role.decorator';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';

@Resolver((of) => User)
@UseGuards(GQLGuard)
export class UserResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }


    @Query((returns) => User, { nullable: true })
    @UseGuards(AuthenticatedSessionGuard)
    async me(@Ctx() context: RequestContext): Promise<UserType> {
        return context.user;
    }

    @Query((returns) => [User], { nullable: true })
    @Roles(UserRole.admin, UserRole.moderator)
    async getUsers(): Promise<UserType[]> {
        return this.prisma.user.findMany();
    }

}
