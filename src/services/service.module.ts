import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityConfig } from '../config/config.interface';
import { EventBusModule } from '../event-bus/event-bus.module';
import { AuthService } from './auth.service';
import { EmailService } from './email.service';
import { EmailGeneratorService } from './emailGenerator.service';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { S3StorageServive } from './s3storage.service';
import { SessionService } from './session.service';
import { UserService } from './user.service';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3, Credentials } from 'aws-sdk';
import { AssetsService } from './asset.service';
import { SharpAssetPreviewService } from './sharp.service';
import { DefaultAssetsNamingService } from './assetNaming.service';

@Module({
    imports: [
        AwsSdkModule.forRootAsync({
            defaultServiceOptions: {
                useFactory: () => {
                    return {
                        region: 'ap-southeast-1',
                        credentials: new Credentials({
                            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
                        }),
                    }
                }
            },
            services: [S3],
        }),
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
    providers: [PrismaService, AuthService, EmailService, EmailGeneratorService, SessionService, UserService, PostService, S3StorageServive, AssetsService, SharpAssetPreviewService, DefaultAssetsNamingService],
    exports: [PrismaService, AuthService, SessionService, UserService, EmailService, PostService, S3StorageServive, AssetsService,],
})
export class ServicesModule { }
