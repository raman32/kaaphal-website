import { Controller, Get, NotFoundException, Param, Render } from '@nestjs/common';
import { PostService } from '../../../services/post.service';
import { PrismaService } from '../../../services/prisma.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly prisma: PrismaService,
        private readonly postService: PostService
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
        const post = await this.postService.getSinglePostFromSlug(slug);
        if (post)
            return {
                post: post
            }
        else {
            throw new NotFoundException();
        }
    }


}


