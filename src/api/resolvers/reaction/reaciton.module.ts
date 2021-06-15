import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { ReactionResolver } from './reaction.resolver';

@Module({
    imports: [ServicesModule],
    providers: [ReactionResolver, RequestContextService],
})
export class ReactionModule { }
