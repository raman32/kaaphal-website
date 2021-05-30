import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventBusModule } from '../event-bus/event-bus.module';
import { ServicesModule } from '../services/service.module';
import { SessionService } from '../services/session.service';
import { RequestContextService } from './common/requestContext.service';
import { DateScalar } from './common/scalar/date.scalar';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthModule } from './resolvers/auth/auth.module';
import { FacebookStrategy } from './controllers/auth/facebook.strategy';
import { GoogleStrategy } from './controllers/auth/google.strategy';
import { PostModule } from './resolvers/post/post.module';
import { UserModule } from './resolvers/user/user.module';


@Module({
    imports: [PostModule, AuthModule, ServicesModule, UserModule, EventBusModule],
    controllers: [AuthController, UserController],
    providers: [RequestContextService,
        SessionService,
        ConfigService,
        DateScalar,
        GoogleStrategy, FacebookStrategy],
})
export class ApiModule { }
