import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityConfig } from '../../../config/config.interface';
import { ServicesModule } from '../../../services/service.module';
import { RequestContextService } from '../../common/requestContext.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const config = configService.get<SecurityConfig>('security');
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.expiresIn,
                    },
                };
            },
            inject: [ConfigService],
        }),
        ServicesModule,
    ],
    providers: [AuthResolver, JwtStrategy, RequestContextService],
    exports: [JwtModule]
})
export class AuthModule { }
