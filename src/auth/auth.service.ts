import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, pass: string) {
    // Cari user di DB (Ganti 'users' sesuai nama model di prisma/schema.prisma)
    // Jika nama tabelnya 'users', Prisma biasanya menamakannya 'users' atau 'User'
    const user = await this.prisma.users.findFirst({ where: { email } }); 

    if (!user) {
       throw new UnauthorizedException('User not found');
    }

    // WARNING: Di production, gunakan bcrypt untuk compare password!
    if (user.password !== pass) { 
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      data: user, // Kirim data user
    };
  }
}