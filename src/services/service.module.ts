import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityConfig } from '../config/config.interface';
import { EventBusModule } from '../event-bus/event-bus.module';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { EmailGeneratorService } from './emailGenerator.service';
import { PrismaService } from './prisma.service';
import { SessionService } from './session.service';
import { UserService } from './user.service';


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
        }), EventBusModule,],
    controllers: [],
    providers: [PrismaService, AuthService, EmailService, EmailGeneratorService, SessionService, UserService],
    exports: [PrismaService, AuthService, SessionService, UserService, EmailService],
})
export class ServicesModule { }
