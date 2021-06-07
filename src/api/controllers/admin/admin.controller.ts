import { Controller, Get, Render } from '@nestjs/common';
import { S3StorageServive } from '../../../services/s3storage.service';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly s3: S3StorageServive
    ) { }
    @Get()
    @Render('Admin')
    async admin() { }

    @Get('CreateArticle')
    @Render('Admin/CreateArticle')
    async createArticle() { }

    @Get('UserManagement')
    @Render('Admin/UserManagement')
    async userManagement() { }

    @Get('CreateUser')
    @Render('Admin/CreateUser')
    async createUser() { }

    @Get('CreateArticleCategory')
    @Render('Admin/CreateArticleCategory')
    async createArticleCategory() { }

    @Get('CreateLoksewaQuestion')
    @Render('Admin/CreateLoksewaQuestion')
    async createLoksewaQuestion() { }


    @Get('CreateLoksewaCategory')
    @Render('Admin/CreateLoksewaCategory')
    async createLoksewaCategory() { }

    @Get('LoksewaQuestionManagement')
    @Render('Admin/LoksewaQuestionManagement')
    async loksewaQuestionManagement() { }

    @Get('S3Test')
    async getS3test() {
        return this.s3.listBucketContents('/')
    }
}