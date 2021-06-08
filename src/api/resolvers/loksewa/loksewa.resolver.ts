import { LoksewaQuestion as LoksewaQuestion_, LoksewaQuestionCategory as LoksewaQuestionCategory_ } from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { PrismaService } from '../../../services/prisma.service';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { LoksewaQuestion } from '../../../models/loksewaQuestion.model';
import { LoksewaQuestionConnection } from '../../../models/pagination/loksewaQuestion-connection';
import { LoksewaQuestionCategory } from '../../../models/loksewaQuestionCategory.model';
import { CreateLoksewaQuestionInput } from '../../../models/inputs/createLoksewaQuestion.input';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../../models/user.model';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateLoksewaQuestionCategoryInput, UpdateLoksewaQuestionCategoryInput } from '../../../models/inputs/loksewaCategory.input';
import { Category } from '../../../models/category.model';
@Resolver(of => LoksewaQuestion)
@UseGuards(GQLGuard)
export class LoksewaResolver {
    constructor(
        private readonly prisma: PrismaService) { }

    @Query(returns => LoksewaQuestionConnection)
    @UseGuards(AuthenticatedSessionGuard)
    async getQuestions(@Args() { after, before, first, last, skip }: PaginationArgs,
        @Args({ name: 'categoryId', type: () => String, nullable: true }) catergoryId: string
    ): Promise<Connection<LoksewaQuestion_, Edge<LoksewaQuestion_>>> {
        const categoryFilter = catergoryId ? { categoryId: catergoryId } : undefined
        const questionConnection = findManyCursorConnection(
            (args) =>
                this.prisma.loksewaQuestion.findMany({ where: categoryFilter, ...args, skip: skip ? skip : 0 }),
            () => this.prisma.loksewaQuestion.count({ where: categoryFilter }),
            { first, last, before, after },
        );
        return questionConnection;
    }

    @Mutation(returns => LoksewaQuestion)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createQuestion(@Args('question') input: CreateLoksewaQuestionInput): Promise<LoksewaQuestion_> {
        return this.prisma.loksewaQuestion.create({ data: input })
    }


    @Mutation(returns => LoksewaQuestionCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createLoksewaCategory(@Args('category') input: CreateLoksewaQuestionCategoryInput): Promise<LoksewaQuestionCategory_> {
        return this.prisma.loksewaQuestionCategory.create({ data: input })
    }


    @Mutation(returns => LoksewaQuestionCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateLoksewaCategory(@Args('category') input: UpdateLoksewaQuestionCategoryInput): Promise<LoksewaQuestionCategory_> {
        return this.prisma.loksewaQuestionCategory.update({ where: { id: input.id }, data: input })
    }

    @Mutation(returns => Boolean)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async deleteLoksewaCategory(@Args('category') input: UpdateLoksewaQuestionCategoryInput): Promise<boolean> {
        try {
            await this.prisma.loksewaQuestionCategory.delete({ where: { id: input.id } });
            return true;
        }
        catch {
            return false;
        }

    }

    @Query(returns => [LoksewaQuestionCategory])
    async getLoksewaCategories(): Promise<LoksewaQuestionCategory_[]> {
        return this.prisma.loksewaQuestionCategory.findMany();
    }


}