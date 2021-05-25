import { Module } from '@nestjs/common';
import { PostModule } from './resolvers/post/post.module';


@Module({
    imports: [PostModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class ApiModule { }
