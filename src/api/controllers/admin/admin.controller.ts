import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
    @Get()
    @Render('Admin')
    admin() { }

    @Get('CreateArticle')
    @Render('Admin/CreateArticle')
    createArticle() { }

    @Get('UserManagement')
    @Render('Admin/UserManagement')
    userManagement() { }
}