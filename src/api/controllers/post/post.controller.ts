import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly prisma: PrismaService
    ) { }



    @Get('create')
    @Render('post/create')
    async createPost() { }


    @Get('/edit/:id')
    @Render('post/edit/[postId]')
    async editPost() { }

    @Get(':slug')
    @Render('post/[slug]')
    async post(@Param('slug') slug: string) {
        const post = await this.prisma.post.findUnique({
            where: { slug: slug }, include: {
                user: { include: { image: true } }, comments: {
                    include: { user: true }
                },
                tags: true,
                reactions: true
            }
        })
        if (post)
            return {
                post: post
            }
        //TODO implement a interceptor here
        else {
            throw new NotFoundException();
        }
    }


}


