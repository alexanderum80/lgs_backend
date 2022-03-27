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
            jwt.verify(token, JWT_SECRET).toString();
            return true;
        } catch (err) {
            return false;
        }
    }

    async validateToken(auth: string): Promise<string> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new Error();
        }

        const token = auth.split(' ')[1];
        try {
            return jwt.verify(token, JWT_SECRET).toString();
        } catch (err) {
            throw new Error();
        }
    }

}