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

      // 3. Cari atau buat user (Upsert)
      let user = await this.prisma.user.upsert({
        where: { email: email },
        update: { name: name || 'User' },
        create: {
          id: uid,
          email: email,
          name: name || 'User',
          password: 'firebase_authenticated',
          phone_number: '+62',
        },
      });

      // 4. Pastikan User punya Role 'member'
      const roleId = '0d809fc2-9fee-427e-a10c-04a177dec6b7';
      await this.prisma.userRole.upsert({
        where: { user_id_role_id: { user_id: user.id, role_id: roleId } },
        update: {},
        create: { user_id: user.id, role_id: roleId },
      });

      // 5. Buat Payload JWT Backend lu sendiri
      const payload = { sub: user.id, email: user.email, role: 'member' };
      const accessToken = this.jwtService.sign(payload); // Generate Token

      // --- TAMBAHAN: UPDATE ACCESS_TOKEN KE DATABASE SUPABASE ---
      // Agar kolom access_token di Supabase tidak lagi "EMPTY" atau "NULL"
      await this.prisma.user.update({
        where: { id: user.id },
        data: { access_token: accessToken },
      });

      return {
        success: true,
        message: 'Login Berhasil Cuk!',
        data: {
          access_token: accessToken, // Kirim ke Flutter
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            image: picture,
          },
        },
      };
    } catch (error) {
      console.error('Auth Error:', error);
      throw new UnauthorizedException('Token Firebase Lu Gagal Diverifikasi!');
    }
  }
}