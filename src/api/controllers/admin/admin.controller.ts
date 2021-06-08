import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AdminController {

    @Get('admin*')
    @Render('admin')
    async admin() { }

    // @Get('CreateArticle')
    // @Render('admin/CreateArticle')
    // async createArticle() { }

    // @Get('UserManagement')
    // @Render('admin/UserManagement')
    // async userManagement() { }

    // @Get('CreateUser')
    // @Render('admin/CreateUser')
    // async createUser() { }

    // @Get('CreateArticleCategory')
    // @Render('admin/CreateArticleCategory')
    // async createArticleCategory() { }

    // @Get('CreateLoksewaQuestion')
    // @Render('admin/CreateLoksewaQuestion')
    // async createLoksewaQuestion() { }


    // @Get('CreateLoksewaCategory')
    // @Render('admin/CreateLoksewaCategory')
    // async createLoksewaCategory() { }

    // @Get('LoksewaQuestionManagement')
    // @Render('admin/LoksewaQuestionManagement')
    // async loksewaQuestionManagement() { }

}