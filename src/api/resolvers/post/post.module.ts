import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { SessionService } from '../../../services/session.service';
import { RequestContextService } from '../../common/requestContext.service';
import { PostResolver } from './post.resolver';

@Module({
    imports: [ServicesModule],
    providers: [PostResolver, RequestContextService],
})
export class PostModule { }
