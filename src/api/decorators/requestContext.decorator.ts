import {
    ContextType,
    createParamDecorator,
    ExecutionContext,
} from '@nestjs/common';
import { REQUEST_CONTEXT_KEY } from '../common/requestContext.service';

export const Ctx = createParamDecorator((data, ctx: ExecutionContext) => {
    if (ctx.getType<ContextType | 'graphql'>() === 'graphql') {
        return ctx.getArgByIndex(2).req[REQUEST_CONTEXT_KEY];
    } else {
        return ctx.switchToHttp().getRequest()[REQUEST_CONTEXT_KEY];
    }
});
