import { ArgumentsHost, ExecutionContext } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export function parseContext(
    context: ExecutionContext | ArgumentsHost,
): {
    req: Request;
    res: Response;
    isGraphQL: boolean;
    info?: GraphQLResolveInfo;
} {
    const graphQLContext = GqlExecutionContext.create(
        context as ExecutionContext,
    );
    const info = graphQLContext.getInfo();
    let req: Request;
    let res: Response;
    if (info) {
        const ctx = graphQLContext.getContext();
        req = ctx.req;
        res = ctx.res;
    } else {
        req = context.switchToHttp().getRequest();
        res = context.switchToHttp().getResponse();
    }
    return {
        req,
        res,
        info,
        isGraphQL: !!info,
    };
}
