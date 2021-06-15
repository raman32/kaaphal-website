import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { NotificationResolver } from './notification.resolver';


@Module({
    imports: [ServicesModule],
    providers: [NotificationResolver, RequestContextService],
})
export class NotificationModule { }
