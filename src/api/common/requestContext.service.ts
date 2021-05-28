import { Session, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { RequestContext } from './requestContext';

export const REQUEST_CONTEXT_KEY = 'KaaphalRequestContext';

export interface SessionWithUser extends Session {
    user: User
}
@Injectable()
export class RequestContextService {
    async fromRequest(
        req: Request,
        info?: GraphQLResolveInfo,
        session?: SessionWithUser,
    ): Promise<RequestContext> {
        const user = session.type === 'AUTHENTICATED' && session.user;
        let isAuthorized = false;
        if (user) {
            isAuthorized = session.type === 'AUTHENTICATED';
        }
        return new RequestContext({
            session,
            isAuthorized,
            request: req,
        });
    }
}
