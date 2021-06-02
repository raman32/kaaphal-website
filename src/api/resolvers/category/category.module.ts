import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { CategoryResolver } from './category.resolver';


@Module({
    imports: [ServicesModule],
    providers: [CategoryResolver, RequestContextService],
})
export class CategoryModule { }
