import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from '../../../../services/session.service';
import { RequestContextService, REQUEST_CONTEXT_KEY, SessionWithUser } from '../../../common/requestContext.service';
import { parseContext } from '../../../common/parseContext';
import { extractAuthToken } from '../../../common/extractAuthToken';


@Injectable()
export class GQLGuard implements CanActivate {
    constructor(
        private readonly sessionService: SessionService,
        private readonly requestContextService: RequestContextService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { req, info } = parseContext(context);
        if (info) {
            const session = await this.getSession(req);
            const requestContext = await this.requestContextService.fromRequest(
                req,
                info,
                session,
            );
            req[REQUEST_CONTEXT_KEY] = requestContext;
            return true;
        } else {
            return false;
        }
    }

    private async getSession(
        req: Request,
    ): Promise<SessionWithUser | undefined> {
        const authToken = extractAuthToken(req);
        let session: SessionWithUser | undefined;
        if (authToken) {
            session = await this.sessionService.validateSession(authToken);
            if (session) {
                return session;
            }
        }
        if (!session) {
            session = await this.sessionService.createAnonymousSession();
        }
        return session;
    }
}
