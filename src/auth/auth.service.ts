import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(idToken: string) {
    try {
      // 1. Verifikasi ID Token Firebase
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      if (!email) {
        throw new UnauthorizedException(
          'Email dari Firebase tidak ditemukan Cuk!',
        );
      }

      // 2. Sync User ke Database
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

      // 3. Assign Role 'member'
      const roleId = '0d809fc2-9fee-427e-a10c-04a177dec6b7';
      await this.prisma.userRole.upsert({
        where: { user_id_role_id: { user_id: user.id, role_id: roleId } },
        update: {},
        create: { user_id: user.id, role_id: roleId },
      });

      // 4. Generate JWT Backend
      const payload = { sub: user.id, email: user.email, role: 'member' };
      const accessToken = this.jwtService.sign(payload);

      // 5. Update access_token di Supabase agar tidak EMPTY
      await this.prisma.user.update({
        where: { id: user.id },
        data: { access_token: accessToken },
      });

      // --- CUKUP RETURN DATA INI SAJA ---
      // Interceptor lu bakal ngebungkus ini jadi: { success: true, message: "Login Berhasil...", data: { access_token, user } }
      return {
        message: 'Login Berhasil Cuk!', // Ini bakal dibaca data?.message di Interceptor
        result: {
          access_token: accessToken,
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

  async loginWithEmail(dto: any) {
  // 1. Cari user berdasarkan email dengan include
  const user = await this.prisma.user.findUnique({
    where: { email: dto.email },
    include: { 
      userRoles: { 
        include: { 
          role: true 
        } 
      } 
    }
  });

  if (!user) {
    throw new NotFoundException('Email tidak terdaftar, Cuk!');
  }

  // 2. Cek Password (Bcrypt)
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Password lu salah, Cuk!');
  }

  // 3. Ambil Role Nama dengan pengecekan array
  // Kita cast ke 'any' di bagian userRoles saja biar property-nya kebaca
  const userWithRoles = user as any;
  const roleName = userWithRoles.userRoles?.[0]?.role?.name || 'member';

  // 4. Generate JWT Backend
  const payload = { sub: user.id, email: user.email, role: roleName };
  const accessToken = this.jwtService.sign(payload);

  // 5. Update access_token di DB
  await this.prisma.user.update({
    where: { id: user.id },
    data: { access_token: accessToken },
  });

  return {
    message: 'Login Berhasil!',
    result: {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  };
}
}
