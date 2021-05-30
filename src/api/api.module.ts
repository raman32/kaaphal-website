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
import { RolesGuard } from './resolvers/auth/guards/role.guard';
import { AuthenticatedSessionGuard } from './resolvers/auth/guards/auth.guard';
import { PostModule } from './resolvers/post/post.module';
import { UserModule } from './resolvers/user/user.module';
import { GQLGuard } from './resolvers/auth/guards/gql.guard';


@Module({
    imports: [PostModule, AuthModule, ServicesModule, UserModule, EventBusModule],
    controllers: [AuthController, UserController],
    providers: [RequestContextService,
        SessionService,
        ConfigService,
        {
            provide: APP_GUARD,
            useClass: GQLGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticatedSessionGuard,
        },
        DateScalar,
        GoogleStrategy, FacebookStrategy],
})
export class ApiModule { }
