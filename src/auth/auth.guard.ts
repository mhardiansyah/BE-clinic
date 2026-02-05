import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Mana tokennya Cuk? (Token missing)');
    }

    const token = authHeader.split(' ')[1];
    try {
      // Verifikasi token langsung ke Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Simpan data user ke dalam request agar bisa dipakai di Controller
      // req.user.id sekarang berisi Firebase UID
      request.user = {
        id: decodedToken.uid,
        email: decodedToken.email,
      };
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token lu palsu atau expired Cuk!');
    }
  }
}