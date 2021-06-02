import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBusModule } from '../event-bus/event-bus.module';
import { ServicesModule } from '../services/service.module';
import { SessionService } from '../services/session.service';
import { RequestContextService } from './common/requestContext.service';
import { DateScalar } from './common/scalar/date.scalar';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AdminController } from './controllers/admin/admin.controller';
import { AuthModule } from './resolvers/auth/auth.module';
import { FacebookStrategy } from './controllers/auth/facebook.strategy';
import { GoogleStrategy } from './controllers/auth/google.strategy';
import { PostModule } from './resolvers/post/post.module';
import { UserModule } from './resolvers/user/user.module';
import { CategoryModule } from './resolvers/category/category.module';
import { TagModule } from './resolvers/tag/tag.module';


@Module({
    imports: [PostModule, AuthModule, ServicesModule, CategoryModule, UserModule, TagModule, EventBusModule],
    controllers: [AuthController, UserController, AdminController],
    providers: [RequestContextService,
        SessionService,
        ConfigService,
        DateScalar,
        GoogleStrategy, FacebookStrategy],
})
export class ApiModule { }
