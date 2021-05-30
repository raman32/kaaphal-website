import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestContext } from '../../../common/requestContext';

@Injectable()
export class AuthenticatedSessionGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const { user } = context as unknown as RequestContext;
        if (!user) {
            return false
        }
        return true
    }
}