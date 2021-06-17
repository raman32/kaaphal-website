import {
    LoksewaQuestion as LoksewaQuestion_,
    LoksewaQuestionCategory as LoksewaQuestionCategory_,
    LoksewaMockCategory as LoksewaMockCategory_,
    LoksewaMockSet as LoksewaMockSet_,
    MockQuestionEdge as MockQuestionEdge_
} from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { PrismaService } from '../../../services/prisma.service';
import { AuthenticatedSessionGuard } from '../auth/guards/auth.guard';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { LoksewaQuestion } from '../../../models/loksewaQuestion.model';
import { LoksewaQuestionConnection } from '../../../models/pagination/loksewaQuestion-connection';
import { LoksewaQuestionCategory } from '../../../models/loksewaQuestionCategory.model';
import { CreateLoksewaQuestionInput, CreateSetQuestionInput, UpdateLoksewaQuestionInput, UpdateSetQuestionInput } from '../../../models/inputs/loksewaQuestion.input';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../../models/user.model';
import { RolesGuard } from '../auth/guards/role.guard';
import { CreateLoksewaQuestionCategoryInput, UpdateLoksewaQuestionCategoryInput } from '../../../models/inputs/loksewaCategory.input';
import { LoksewaMockCategory } from '../../../models/loksewaMockCategory.model';
import { CreateLoksewaMockCategoryInput, UpdateLoksewaMockCategoryInput } from '../../../models/inputs/loksewaMockCategory.input';
import { CreateLoksewaMockSetInput, UpdateLoksewaMockSetInput } from '../../../models/inputs/loksewaSet.input';
import { LoksewaMockSet } from '../../../models/loksewaMockSet.model';
import { Category } from '../../../models/category.model';
import { MockQuestionEdge } from '../../../models/mockQuestionEdge.model';
@Resolver(of => LoksewaQuestion)
@UseGuards(GQLGuard)
export class LoksewaResolver {
    constructor(
        private readonly prisma: PrismaService) { }

    @Query(() => LoksewaQuestionConnection)
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

    @Mutation(() => LoksewaQuestion)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createQuestion(@Args('question') input: CreateLoksewaQuestionInput): Promise<LoksewaQuestion_> {
        return this.prisma.loksewaQuestion.create({ data: input })
    }

    @Mutation(() => LoksewaQuestion)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateQuestion(@Args('question') input: UpdateLoksewaQuestionInput): Promise<LoksewaQuestion_> {
        return this.prisma.loksewaQuestion.update({ where: { id: input.id }, data: input })
    }



    @Mutation(() => LoksewaQuestionCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createLoksewaCategory(@Args('category') input: CreateLoksewaQuestionCategoryInput): Promise<LoksewaQuestionCategory_> {
        return this.prisma.loksewaQuestionCategory.create({ data: input })
    }


    @Mutation(() => LoksewaQuestionCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateLoksewaCategory(@Args('category') input: UpdateLoksewaQuestionCategoryInput): Promise<LoksewaQuestionCategory_> {
        return this.prisma.loksewaQuestionCategory.update({ where: { id: input.id }, data: input })
    }

    @Mutation(() => Boolean)
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

    @Query(() => [LoksewaQuestionCategory])
    async getLoksewaCategories(): Promise<LoksewaQuestionCategory_[]> {
        return this.prisma.loksewaQuestionCategory.findMany();
    }




    @Mutation(() => LoksewaMockCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createLoksewaMockCategory(@Args('category') input: CreateLoksewaMockCategoryInput): Promise<LoksewaMockCategory_> {
        return this.prisma.loksewaMockCategory.create({ data: input })
    }


    @Mutation(() => LoksewaMockCategory)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateLoksewaMockCategory(@Args('category') input: UpdateLoksewaMockCategoryInput): Promise<LoksewaMockCategory_> {
        return this.prisma.loksewaMockCategory.update({ where: { id: input.id }, data: input })
    }

    @Mutation(() => Boolean)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async deleteLoksewaMockCategory(@Args('category') input: UpdateLoksewaMockCategoryInput): Promise<boolean> {
        try {
            await this.prisma.loksewaMockCategory.delete({ where: { id: input.id } });
            return true;
        }
        catch {
            return false;
        }

    }

    @Query(() => [LoksewaMockCategory])
    async getLoksewaMockCategories(): Promise<LoksewaMockCategory_[]> {
        return this.prisma.loksewaMockCategory.findMany();
    }



    @Mutation(() => LoksewaMockSet)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createMockSet(@Args('set') input: CreateLoksewaMockSetInput): Promise<LoksewaMockSet_> {
        return this.prisma.loksewaMockSet.create({ data: input });
    }


    @Mutation(() => LoksewaMockSet)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateMockSet(@Args('set') input: UpdateLoksewaMockSetInput): Promise<LoksewaMockSet_> {
        return this.prisma.loksewaMockSet.update({ where: { id: input.id }, data: input });
    }


    @Mutation(() => Boolean)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async deleteMockSet(@Args('set') input: UpdateLoksewaMockSetInput): Promise<boolean> {
        try {
            await this.prisma.loksewaMockSet.delete({ where: { id: input.id } });
            return true;
        }
        catch {
            return false;
        }

    }


    @Query(() => LoksewaMockCategory)
    async getMockCategory(@Args('categoryId') categoryId: string): Promise<LoksewaMockCategory_> {
        return this.prisma.loksewaMockCategory.findFirst({ where: { id: categoryId } })
    }


    @ResolveField(() => LoksewaMockCategory)
    async getMockCategoryFromSet(@Parent() set: LoksewaMockSet): Promise<LoksewaMockCategory_> {
        const { categoryId } = set;
        return this.prisma.loksewaMockCategory.findFirst({ where: { id: categoryId } })
    }

    @Query(() => [LoksewaMockSet])
    async getMockSets(@Args('categoryId') categoryId: string): Promise<LoksewaMockSet_[]> {
        return this.prisma.loksewaMockSet.findMany({ where: { categoryId: categoryId } })
    }



    @Query(() => LoksewaMockSet)
    @UseGuards(AuthenticatedSessionGuard)
    async getMockSet(@Args('setId') setId: string): Promise<LoksewaMockSet_> {
        return this.prisma.loksewaMockSet.findUnique({
            where: { id: setId }, include: {
                category: true,
                questions: {
                    select: {
                        order: true,
                        weight: true,
                        question: true
                    },
                    orderBy: {
                        order: 'asc',
                    }

                }

            }
        })
    }



    @Mutation(() => MockQuestionEdge)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async createSetQuestion(@Args('question') { additionalDetails, answer, categoryId, difficulty, metaId, optionA, optionB, optionC, optionD, setId, title, order, weight }: CreateSetQuestionInput): Promise<MockQuestionEdge_> {
        return this.prisma.mockQuestionEdge.create({
            data: {
                order: order,
                set: { connect: { id: setId }, },
                weight: weight,
                question: { create: { additionalDetails, answer, categoryId, difficulty, metaId, optionA, optionB, optionC, optionD, title, showInMCQ: false } }
            }
        })
    }

    @Mutation(() => MockQuestionEdge)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async updateSetQuestion(@Args('question') input: UpdateSetQuestionInput): Promise<MockQuestionEdge_> {
        this.prisma.loksewaQuestion.update({ where: { id: input.questionId }, data: input })
        return this.prisma.mockQuestionEdge.update({
            where: { id: input.id }, data: {
                order: input.order,
                weight: input.weight,
            }
        })
    }


}