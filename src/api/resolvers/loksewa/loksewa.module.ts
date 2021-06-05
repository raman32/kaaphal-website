import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { LoksewaResolver } from './loksewa.resolver';


@Module({
    imports: [ServicesModule],
    providers: [LoksewaResolver, RequestContextService],
})
export class LoksewaModule { }
