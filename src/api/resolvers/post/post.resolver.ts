import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Post } from '../../../models/post.model';

@Resolver(of => Post)
export class PostResolver {
    constructor() { }

    @Query(returns => Post)
    async post(@Args('id', { type: () => Int }) id: number) {
        return {}
    }

}