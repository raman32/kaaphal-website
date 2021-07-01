import {
    File as File_
} from '.prisma/client';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/pagination/pagination.args';
import { PrismaService } from '../../../services/prisma.service';
import { GQLGuard } from '../auth/guards/gql.guard';
import { Connection, Edge, findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { LoksewaQuestion } from '../../../models/loksewaQuestion.model';
import { CreateLoksewaQuestionInput } from '../../../models/inputs/loksewaQuestion.input';
import { Roles } from '../../decorators/role.decorator';
import { UserRole } from '../../../models/user.model';
import { RolesGuard } from '../auth/guards/role.guard';
import { File } from '../../../models/file.model';
import { FileConnection } from '../../../models/pagination/file-connection';
import { AssetsService } from '../../../services/asset.service';
@Resolver(of => File)
@UseGuards(GQLGuard)
export class FileResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly assestService: AssetsService) { }

    @Query(() => FileConnection)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async getFiles(@Args() { after, before, first, last, skip }: PaginationArgs,
        @Args({ name: 'postId', type: () => String, nullable: true }) postId: string,
        @Args({ name: 'userId', type: () => String, nullable: true }) userId: string,
    ): Promise<Connection<File_, Edge<File_>>> {
        const userFilter = userId ? { userId: userId } : undefined
        const postFilter = postId ? { postId: postId } : undefined
        const fileConnection = findManyCursorConnection(
            (args) =>
                this.prisma.file.findMany({ where: { ...userFilter, ...postFilter }, ...args, skip: skip ? skip : 0 }),
            () => this.prisma.file.count(),
            { first, last, before, after },
        );
        return fileConnection;
    }

    @Mutation(() => Boolean)
    @Roles(UserRole.admin, UserRole.moderator)
    @UseGuards(RolesGuard)
    async deleteFile(@Args({ name: 'fileId', type: () => String }) id: string): Promise<boolean> {
        try {
            const file = await this.prisma.file.findUnique({ where: { id } })
            if (file)
                await this.assestService.delete(file)
            await this.prisma.file.delete({ where: { id: file.id } })
            return true

        }
        catch {
            return false;
        }
    }



}