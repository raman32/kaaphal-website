import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { UserResolver } from './user.resolver';

@Module({
    imports: [ServicesModule],
    providers: [UserResolver, RequestContextService],
})
export class UserModule { }
