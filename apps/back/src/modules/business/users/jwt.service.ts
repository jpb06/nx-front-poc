import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { User } from '../../dal/types/user.interface';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class JwtService {
  async sign(user: User): Promise<string> {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '24h',
      }
    );

    return token;
  }

  async verify(token: string): Promise<JwtPayload | undefined> {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
        ignoreExpiration: false,
      });

      return payload as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  decode(token: string): JwtPayload {
    return jwt.decode(token) as JwtPayload;
  }
}
