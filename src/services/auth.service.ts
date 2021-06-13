import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, Session, File } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EventBus } from '../event-bus/event-bus';
import {
    MagicLinkEvent,
    MagicLinkVerificationEvent,
} from '../event-bus/events';
import { SessionService } from './session.service';
import moment from 'moment';
import { MagicLinkDto } from '../api/common/dto/magicLink.dto';
import { Auth } from '../api/common/dto/auth.dto';
import { AssetsService } from './asset.service';
import { URL } from 'url';
import { parseFullName } from '../../lib/common/helpers/parse';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
        private eventBus: EventBus,
        private readonly sessionService: SessionService,
        private readonly assetService: AssetsService
    ) { }

    getUserFromToken(token: string): Promise<User> {
        const id = this.jwtService.decode(token)['userId'];
        return this.prisma.user.findUnique({ where: { id } });
    }

    async validateUser({ userId }: { userId: string }): Promise<User> {
        return this.prisma.user.findUnique({ where: { id: userId } });
    }

    async sendMagicLink({ email }: { email: string }): Promise<MagicLinkDto> {
        const session = await this.generateMagicToken({ email });
        // TODO emit send magic link event
        this.eventBus.publish(new MagicLinkEvent(session.authToken, email));
        return { status: true, listener: session.token };
    }

    async validateMagicLink({
        token,
    }: { token: string }): Promise<{ auth?: Auth; isRegistered?: boolean; invalid: boolean }> {
        let extractedToken;
        try {
            extractedToken = await this.validateMagicToken({ token });
        } catch (e) {
            return {
                invalid: true,
            };
        }
        const magicSession = await this.sessionService.getSessionData(
            extractedToken.session,
        );
        if (moment(magicSession.expires).isBefore(moment())) {
            return {
                invalid: true,
            };
        }
        const user = await this.prisma.user.findUnique({
            where: { email: extractedToken.email },
        });

        // eslint-disable-next-line
        const currentUser = user ? user
            : await this.prisma.user.create({
                data: {
                    email: extractedToken.email.toLowerCase(),
                    firstName: '',
                },
            });
        const session = await this.sessionService.authenticate(user);
        const deliveryData = {
            auth: {
                user: currentUser,
                accessToken: session.authToken,
                refreshToken: session.refreshToken,
            },
            isRegistered: !!user,
            invalid: false,
        };
        this.eventBus.publish(
            new MagicLinkVerificationEvent(magicSession.token, deliveryData),
        );
        return deliveryData;
    }


    private validateMagicToken({
        token,
    }: { token: string }): Promise<{ email: string; session: string }> {
        try {
            const validate: any = this.jwtService.decode(token);
            return validate;
        } catch (e) {
            throw new UnauthorizedException('Expired or Invalid Link!');
        }
    }


    private async generateMagicToken(payload: {
        email: string;
    }): Promise<Session & { user: User }> {
        return this.sessionService.createMagicSession(payload);
    }

    private async getPictureFromUrl(url: string): Promise<File> {
        const pathname = new URL(url).pathname;
        const index = pathname.lastIndexOf('/');
        const fileName = (-1 !== index) ? pathname.substring(index + 1) : pathname;
        return this.assetService.createFromExternalLink(url, fileName, 'image/jpeg')
    }

    async validateGoogleLogin({ email, firstName, image, lastName, accessToken }: {
        email: string,
        firstName: string,
        lastName: string,
        image: string,
        accessToken: string
    }): Promise<{ auth?: Auth; isRegistered?: boolean; invalid: boolean }> {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });

        // eslint-disable-next-line
        const currentUser = user ? user
            : await this.prisma.user.create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    image: { connect: { id: (await this.getPictureFromUrl(image)).id } },
                    displayName: parseFullName(firstName, '', lastName)
                },
            });
        const session = await this.sessionService.authenticate(user, null, accessToken);
        const deliveryData = {
            auth: {
                user: currentUser,
                accessToken: session.authToken,
                refreshToken: session.refreshToken,
            },
            isRegistered: !!user,
            invalid: false,
        };
        //TODO EMIT A GOOGLE LOGIN EVENT
        // this.eventBus.publish(
        //   ,
        // );
        return deliveryData;
    }
    async validateFacebookLogin({ email, firstName, image, lastName, accessToken }: {
        email: string,
        firstName: string,
        lastName: string,
        image: string,
        accessToken: string
    }): Promise<{ auth?: Auth; isRegistered?: boolean; invalid: boolean }> {
        const user = await this.prisma.user.findUnique({
            where: { email: email },
        });

        // eslint-disable-next-line
        const currentUser = user ? user
            : await this.prisma.user.create({
                data: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    image: { connect: { id: (await this.getPictureFromUrl(image)).id } },
                    displayName: parseFullName(firstName, '', lastName)
                },
            });
        const session = await this.sessionService.authenticate(user, accessToken, null);
        const deliveryData = {
            auth: {
                user: currentUser,
                accessToken: session.authToken,
                refreshToken: session.refreshToken,
            },
            isRegistered: !!user,
            invalid: false,
        };
        //TODO EMIT A GOOGLE LOGIN EVENT
        // this.eventBus.publish(
        //   ,
        // );
        return deliveryData;
    }

}
