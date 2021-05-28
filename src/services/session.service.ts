import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import uniqid from 'uniqid';
import ms from 'ms';
import { PrismaService } from './prisma.service';
import { SecurityConfig } from '../config/config.interface';
import { ConfigService } from '@nestjs/config';
import { Session, User } from '.prisma/client';
import { SessionWithUser } from '../api/common/requestContext.service';

@Injectable()
export class SessionService {
    private readonly sessionDurationInMs: number;

    constructor(
        private jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
    ) {
        this.sessionDurationInMs = ms('1d');
    }

    async getSessionData(sessionToken: string): Promise<Session & { user: User }> {
        const session = await this.prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true },
        });
        return session;
    }

    async createMagicSession(payload: { email: string }): Promise<Session & { user: User }> {
        const sessionToken = await this.generateSessionToken();
        const token = this.jwtService.sign(
            { session: sessionToken, email: payload.email },
            {
                expiresIn: '10m',
            },
        );
        return this.prisma.session.create({
            data: {
                token: sessionToken,
                authToken: token,
                type: 'MAGIC',
                expires: await this.getExpiryDate(ms('10m')),
            },
            include: {
                user: true,
            },
        });
    }

    async authenticate(user: User): Promise<{
        user: User;
        authToken: string;
        refreshToken: string;
    }> {
        return this.createNewAuthenticatedSession({ user });
    }

    async createNewAuthenticatedSession({
        user,
    }: { user: User }): Promise<{ user: User; authToken: string; refreshToken: string }> {
        const token = await this.generateSessionToken();
        const authToken = await this.generateAccessToken(user.id, token);
        const awaitSession = await this.prisma.session.create({
            data: {
                token,
                authToken: authToken.accessToken,
                refreshToken: authToken.refreshToken,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                expires: this.getExpiryDate(this.sessionDurationInMs),
                invalidate: false,
                type: 'AUTHENTICATED',
            },
            include: {
                user: true,
            },
        });
        return {
            user: awaitSession.user,
            authToken: authToken.accessToken,
            refreshToken: authToken.refreshToken,
        };
    }

    async createAnonymousSession(): Promise<SessionWithUser> {
        const token = await this.generateSessionToken();
        const anonymousSessionDurationInMs = ms('1y');
        return await this.prisma.session.create({
            data: {
                token,
                expires: this.getExpiryDate(anonymousSessionDurationInMs),
                invalidate: false,
                type: 'ANONYMOUS',
            },
            include: {
                user: true,
            },
        });
    }

    async revalidateSession(
        refreshToken: string,
    ): Promise<
        { user: User; authToken: string; refreshToken: string } | undefined
    > {
        const extracted: any = this.jwtService.decode(refreshToken, {
            complete: true,
        });
        const existSession = await this.prisma.session.findUnique({
            where: { token: extracted.payload.session },
            include: {
                user: true,
            },
        });
        if (
            existSession &&
            existSession.expires > new Date() &&
            !existSession.invalidate
        ) {
            await this.updateSessionExpiry(existSession);
            const newTokens = await this.generateAccessToken(
                existSession.user.id,
                existSession.token,
            );
            return {
                user: existSession.user,
                authToken: newTokens.accessToken,
                refreshToken: newTokens.refreshToken,
            };
        } else {
            return undefined;
        }
    }

    async validateSession(token: string): Promise<SessionWithUser> {
        const payload: any = this.jwtService.decode(token, { complete: true });
        const existSession = await this.prisma.session.findFirst({
            where: {
                token: payload.payload.session,
                invalidate: false,
            },
            include: {
                user: true,
            },
        });
        if (existSession && existSession.expires > new Date()) {
            await this.updateSessionExpiry(existSession);
            return existSession;
        }
    }

    private async updateSessionExpiry(session) {
        const now = new Date().getTime();
        if (session.expires.getTime() - now < this.sessionDurationInMs / 2) {
            await this.prisma.session.update({
                where: { id: session.id },
                data: { expires: this.getExpiryDate(this.sessionDurationInMs) },
            });
        }
    }

    private generateSessionToken(): Promise<string> {
        return new Promise<string>((resolve) => resolve(uniqid('session-')));
    }

    private getExpiryDate(timeToExpireInMs: number): Date {
        return new Date(Date.now() + timeToExpireInMs);
    }

    /**
     *
     * @param payload - String
     * @private
     */
    async generateAccessToken(userId: string, session: string): Promise<{ accessToken: string, refreshToken: string }> {
        const security = this.config.get<SecurityConfig>('security');
        const accessToken = await this.jwtService.signAsync(
            {
                session: session,
                userId: userId,
            },
            {
                expiresIn: security.expiresIn,
            },
        );
        const refreshToken = await this.jwtService.signAsync(
            { session: session },
            { expiresIn: '30d' },
        );
        return {
            accessToken,
            refreshToken,
        };
    }
}