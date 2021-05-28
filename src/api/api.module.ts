import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { EventBusModule } from '../event-bus/event-bus.module';
import { ServicesModule } from '../services/service.module';
import { SessionService } from '../services/session.service';
import { RequestContextService } from './common/requestContext.service';
import { DateScalar } from './common/scalar/date.scalar';
import { AuthController } from './controllers/auth/auth.controller';
import { UserController } from './controllers/user/user.controller';
import { AuthModule } from './resolvers/auth/auth.module';
import { GoogleStrategy } from './resolvers/auth/google.strategy';
import { GQLAuthGuard } from './resolvers/auth/guards/auth.guard';
import { PostModule } from './resolvers/post/post.module';
import { UserModule } from './resolvers/user/user.module';


@Module({
    imports: [PostModule, AuthModule, ServicesModule, UserModule, EventBusModule],
    controllers: [AuthController, UserController],
    providers: [RequestContextService,
        SessionService,
        ConfigService,
        {
            provide: APP_GUARD,
            useClass: GQLAuthGuard,
        },
        DateScalar,
        GoogleStrategy,],
})
export class ApiModule { }
