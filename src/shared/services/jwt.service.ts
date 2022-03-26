import { JWT_SECRET } from './../helpers/auth.guard';
import { UsersEntity } from './../../users/users.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    
    createToken(userInfo: UsersEntity) {
        return jwt.sign(userInfo, JWT_SECRET, {
            expiresIn: '60'
        });
    }
    
    async validateToken(auth: string): Promise<string> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }

        const token = auth.split(' ')[1];
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw new HttpException('Token Inválido', HttpStatus.UNAUTHORIZED);
        }
    }

}
