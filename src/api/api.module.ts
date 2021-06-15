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
import { LoksewaModule } from './resolvers/loksewa/loksewa.module';
import { AssetsModule } from './resolvers/asset/asset.module';
import { AssetsController } from './controllers/asset/assest.controller';
import { LoksewaContorller } from './controllers/loksewa/loksewa.controller';
import { AboutUsController, PrivacyPolicyController, TermsAndConditionsController } from './controllers/other/other.controller';
import { PostController } from './controllers/post/post.controller';
import { CommentModule } from './resolvers/comment/comment.module';
import { NotificationModule } from './resolvers/notification/notification.module';
import { ReactionModule } from './resolvers/reaction/reaciton.module';


@Module({
    imports: [PostModule, AuthModule, ServicesModule, CategoryModule, UserModule, TagModule, LoksewaModule, EventBusModule, AssetsModule, CommentModule, NotificationModule, ReactionModule],
    controllers: [AuthController, UserController, AdminController, AssetsController, LoksewaContorller, PrivacyPolicyController, TermsAndConditionsController, AboutUsController, PostController],
    providers: [RequestContextService,
        SessionService,
        ConfigService,
        DateScalar,
        GoogleStrategy, FacebookStrategy],
})
export class ApiModule { }
