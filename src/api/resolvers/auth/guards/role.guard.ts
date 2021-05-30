import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../../models/user.model';
import { RequestContext } from '../../../common/requestContext';
import { Ctx } from '../../../decorators/requestContext.decorator';
import { ROLES_KEY } from '../../../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = context as unknown as RequestContext;
        if (!user) {
            return false
        }
        return requiredRoles.some((role) => user.role === role);
    }
}