import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_GRAPHQL_CONTEXT = 'user';
export const JWT_SECRET = 'LgsCasinoEAE';
export const JWT_SECRET_REFRESH = 'EAELgsCasino';

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        const auth = ctx.req.headers.authorization;

        if (!auth) {
            return false;
        }

        if (auth.split(' ')[0] !== 'Bearer') {
            return false;
        }

        const token = auth.split(' ')[1];
        try {
            ctx[DEFAULT_GRAPHQL_CONTEXT] = jwt.verify(token, JWT_SECRET);
            return true;
        } catch (err) {
            return false;
        }
    }


}