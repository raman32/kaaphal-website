import { Post as Post_ } from '.prisma/client';
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

@Resolver(of => Category)
@UseGuards(GQLGuard)
export class CategoryResolver {
    constructor(
        private readonly postService: PostService,
        private readonly prisma: PrismaService) { }

    @Query(returns => [Category])
    async getCategories(): Promise<Category_[]> {
        return this.prisma.category.findMany();
    }

    @Query(returns => Category)
    async getCategory(@Args('id') id: string): Promise<Category_> {
        return this.prisma.category.findUnique({ where: { id } });
    }

    @Mutation(returns => Category)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createCategory(@Args('category') input: CreateCategoryInput): Promise<Category_> {
        return this.prisma.category.create({ data: { name: input.name } })
    }


    @Mutation(returns => Category)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createSubCategory(@Args('subCategory') input: CreateSubCategoryInput): Promise<SubCategory_> {
        return this.prisma.subCategory.create({ data: { name: input.name, parentId: input.parentId } })
    }



    @ResolveField('subCategories', returns => [SubCategory])
    async user(@Parent() category: Category): Promise<SubCategory_[]> {
        const { id } = category;
        return this.prisma.subCategory.findMany({ where: { parentId: id } })
    }

    @ResolveField('post', returns => [Post])
    async postsOfCategory(@Parent() category: Category): Promise<Post_[]> {
        const { id } = category;
        return this.prisma.post.findMany({ where: { categoryId: id } })
    }

    @ResolveField('post', returns => [Post])
    async postsOfSubCategory(@Parent() subCategory: SubCategory): Promise<Post_[]> {
        const { id } = subCategory;
        return this.prisma.post.findMany({ where: { subCategoryId: id } })
    }

}