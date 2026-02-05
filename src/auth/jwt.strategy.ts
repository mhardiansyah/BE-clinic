// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // src/auth/jwt.strategy.ts
constructor(configService: ConfigService) {
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    // Tambahkan || 'secretKey' agar TypeScript tahu ini nggak bakal undefined
    secretOrKey: configService.get<string>('JWT_SECRET') || 'rahasia_super_aman_ganti_ini', 
  });
}

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}