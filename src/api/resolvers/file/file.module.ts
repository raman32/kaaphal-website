import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { FileResolver } from './file.resolver';


@Module({
    imports: [ServicesModule],
    providers: [FileResolver, RequestContextService],
})
export class FileModule { }
