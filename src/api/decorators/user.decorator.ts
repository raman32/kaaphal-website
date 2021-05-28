import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Deprecation - use requestContext decorator instead
 */
export const UserEntity = createParamDecorator(
    (data: any, ctx: ExecutionContext) => {
        GqlExecutionContext.create(ctx).getContext().req.user;
    },
);
