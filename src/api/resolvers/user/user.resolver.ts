import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../../../models/user.model';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from '../auth/guards/auth.guard';
import { PrismaService } from '../../../services/prisma.service';
import { User as UserType } from 'prisma/prisma-client'
import { UserService } from '../../../services/user.service';
import { RequestContext } from '../../common/requestContext';
import { Ctx } from '../../decorators/requestContext.decorator';

@Resolver((of) => User)
@UseGuards(GQLAuthGuard)
export class UserResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
    ) { }

    @Query((returns) => User, { nullable: true })
    async me(@Ctx() context: RequestContext): Promise<UserType> {
        return context.user;
    }

}
