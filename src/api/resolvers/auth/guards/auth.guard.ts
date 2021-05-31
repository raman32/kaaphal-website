import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { parseContext } from '../../../common/parseContext';
import { RequestContext } from '../../../common/requestContext';
import { REQUEST_CONTEXT_KEY } from '../../../common/requestContext.service';

@Injectable()
export class AuthenticatedSessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { req } = parseContext(context);
        const { user } = req[REQUEST_CONTEXT_KEY] as RequestContext;
        if (!user) {
            return false;
        }
        return true
    }
}