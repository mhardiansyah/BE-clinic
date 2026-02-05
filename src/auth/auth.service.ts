import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(idToken: string) {
    try {
      // 1. Verifikasi ID Token Firebase di Backend
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      // 2. Tambahkan pengecekan atau default value
      if (!email) {
        throw new UnauthorizedException(
          'Email dari Firebase tidak ditemukan Cuk!',
        );
      }

      let user = await this.prisma.user.upsert({
        where: { email: email },
        update: { name: name || 'User' },
        create: {
          id: uid,
          email: email, // Sekarang TS sudah yakin email adalah 'string'
          name: name || 'User',
          password: 'firebase_authenticated',
          phone_number: '+62',
        },
      });

      // 3. Pastikan User punya Role 'member' (ID dari screenshot lu)
      const roleId = '0d809fc2-9fee-427e-a10c-04a177dec6b7';
      await this.prisma.userRole.upsert({
        where: { user_id_role_id: { user_id: user.id, role_id: roleId } },
        update: {},
        create: { user_id: user.id, role_id: roleId },
      });

      // 4. Buat Payload JWT Backend lu sendiri
      const payload = { sub: user.id, email: user.email, role: 'member' };

      return {
        success: true,
        message: 'Login Berhasil Cuk!',
        data: {
          access_token: this.jwtService.sign(payload), // JWT dari NestJS
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: picture,
          },
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Token Firebase Lu Gagal Diverifikasi!');
    }
  }
}
