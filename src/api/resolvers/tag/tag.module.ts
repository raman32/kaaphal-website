import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { TagResolver } from './tag.resolver';

@Module({
    imports: [ServicesModule],
    providers: [TagResolver, RequestContextService],
})
export class TagModule { }
