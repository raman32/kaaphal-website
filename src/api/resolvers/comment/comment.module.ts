import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { CommentResolver } from './comment.resolver';


@Module({
    imports: [ServicesModule],
    providers: [CommentResolver, RequestContextService],
})
export class CommentModule { }
