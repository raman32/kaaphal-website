import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../../models/user.model';
import { parseContext } from '../../../common/parseContext';
import { RequestContext } from '../../../common/requestContext';
import { ROLES_KEY } from '../../../decorators/role.decorator';
import { REQUEST_CONTEXT_KEY } from '../../../common/requestContext.service'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles.length) {
            return true;
        }
        const { req } = parseContext(context);
        const { user } = req[REQUEST_CONTEXT_KEY] as RequestContext;
        if (!user) {
            return false;
        }
        return requiredRoles.some((role) => user.role === role);
    }
}
