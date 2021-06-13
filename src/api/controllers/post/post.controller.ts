import { Controller, Get, Param, Render } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { PrismaService } from '../../../services/prisma.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    @Get(':slug')
    @Render('post/[slug]')
    async privacyPolicy(@Param('slug') slug: string) {
        const post = await this.prisma.post.findUnique({
            where: { slug: slug }, include: {
                user: { include: { image: true } }, comments: {
                    include: { user: true }
                },
                tags: true
            }
        })
        return {
            post: post
        }
    }
}


