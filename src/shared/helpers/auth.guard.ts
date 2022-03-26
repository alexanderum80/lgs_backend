import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export const DEFAULT_GRAPHQL_CONTEXT = 'user';
export const JWT_SECRET = 'LgsCasinoEAE';
export const JWT_SECRET_REFRESH = 'EAELgsCasino';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.req.headers.authorization) {
            return false;
        }

        this.validateToken(ctx.req.headers.authorization).then(token => {
            ctx[DEFAULT_GRAPHQL_CONTEXT] = token;
        }).catch(err => {
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        });

        return true;
    }

    async validateToken(auth: string): Promise<string> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
             new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }
    }

}