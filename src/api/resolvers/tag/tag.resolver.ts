import { Post as Post_, Tag as Tag_ } from '.prisma/client';
import { User as User_ } from '.prisma/client';
import { Category as Category_ } from '.prisma/client';
import { SubCategory as SubCategory_ } from '.prisma/client';
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
import { Category } from '../../../models/category.model';
import { SubCategory } from '../../../models/subCategory.model';
import { CreateCategoryInput } from '../../../models/inputs/createCategory.input';
import { CreateSubCategoryInput } from '../../../models/inputs/createSubCategory.input';
import { TagConnection } from '../../../models/pagination/tag-connection';
import { CreateTagInput } from '../../../models/inputs/createTag.input';

@Resolver(of => Category)
@UseGuards(GQLGuard)
export class TagResolver {
    constructor(
        private readonly postService: PostService,
        private readonly prisma: PrismaService) { }

    @Query(returns => TagConnection)
    async getTags(@Args() { after, before, first, last }: PaginationArgs,
        @Args({ name: 'contains', nullable: true, type: () => String, }) contains?: string,): Promise<Connection<Tag_, Edge<Tag_>>> {

        const tagConnection = findManyCursorConnection(
            (args) =>
                this.prisma.tag.findMany({
                    where: {
                        name: {
                            contains
                        }
                    },
                    ...args,
                }),
            () => this.prisma.post.count(),
            { first, last, before, after },
        );
        return tagConnection;
    }

    @Query(returns => Category)
    async getTag(@Args('id') id: string): Promise<Tag_> {
        return this.prisma.tag.findUnique({ where: { id } });
    }

    @Mutation(returns => Category)
    @UseGuards(AuthenticatedSessionGuard)
    async createTag(@Args('tag') input: CreateTagInput): Promise<Tag_> {
        return this.prisma.tag.create({ data: { name: input.name, advertisementId: input.advertisementId } })
    }


}