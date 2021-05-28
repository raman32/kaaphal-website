import { JsonCompatible } from '../../common';
import { Request } from 'express';
import { SessionWithUser } from './requestContext.service';
import { Session, User } from '.prisma/client';

export type SerializeRequestContext = {
    _session: JsonCompatible<Session> & {
        user: JsonCompatible<User>;
    };
    _isAuthorized: boolean;
    _req: Request;
};

export class RequestContext {
    private readonly _session?: SessionWithUser;
    private _isAuthorized;
    _req: Request;

    constructor(options: {
        session: SessionWithUser;
        isAuthorized: boolean;
        request: Request;
    }) {
        const { session, isAuthorized, request } = options;
        this._session = session;
        this._isAuthorized = isAuthorized;
        this._req = request;
    }

    static deserialize(ctxObject: SerializeRequestContext): RequestContext {
        let session: SessionWithUser | undefined;
        let isAuthorized: boolean;
        if (ctxObject._session) {
            if (ctxObject._session.user) {
                const user = Object.create(ctxObject._session.user)
                session = Object.create({
                    ...ctxObject._session,
                    user,
                    type: 'AUTHENTICATED',
                });
                isAuthorized = true;
            } else {
                session = Object.create({ ...ctxObject._session });
                isAuthorized = false;
            }
        }
        return new RequestContext({
            session,
            isAuthorized: isAuthorized,
            request: ctxObject._req,
        });
    }

    serialize(): SerializeRequestContext {
        return JSON.parse(JSON.stringify(this));
    }

    get session(): SessionWithUser | undefined {
        return this._session;
    }

    get user(): User | undefined {
        if (this.session) {
            if (this.isAuthenticatedSession(this.session)) {
                return this.session.user;
            }
        }
    }

    private isAuthenticatedSession(session: SessionWithUser): boolean {
        return session.type === 'AUTHENTICATED';
    }
}
