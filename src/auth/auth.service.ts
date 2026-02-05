import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  // async googleLogin(data: { email: string; name: string; photoUrl?: string }) {
  //   let user = await this.prisma.user.findUnique({
  //     where: { email: data.email },
  //   });

  //   if (!user) {
  //     // Create new user
  //     user = await this.prisma.user.create({
  //       data: {
  //         email: data.email,
  //         name: data.name,
  //         password: '', // No password for google user
  //         phone_number: '+62', // Default phone number
  //       },
  //     });

  //     // Create profile picture file entry if photoUrl exists
  //     if (data.photoUrl) {
  //       // Assuming 'files' table usage as seen in LoginController.dart: 
  //       // 'module_class': 'users', 'module_id': userId, 'file_name': photoUrl
  //       await this.prisma.file.create({
  //         data: {
  //           module_class: 'users',
  //           module_id: user.id,
  //           file_name: data.photoUrl,
  //           file_type: 'webp', // default or extract from url
  //         }
  //       });
  //     }

  //     // Assign role 'member'
  //     // Try to find role 'member'
  //     let memberRole = await this.prisma.role.findUnique({ where: { name: 'member' } });

  //     // If member role doesn't exist, maybe create it? Or seek by specific ID if known?
  //     // LoginController.dart had hardcoded ID: '0d809fc2-9fee-427e-a10c-04a177dec6b7'

  //     if (!memberRole) {
  //       // Fallback: try to find by ID if we want to be safe, or just skip
  //       // or create it.
  //       // For now, let's assume it exists or create simple one
  //       memberRole = await this.prisma.role.upsert({
  //         where: { name: 'member' },
  //         update: {},
  //         create: { name: 'member', description: 'Member Role' }
  //       });
  //     }

  //     if (memberRole) {
  //       await this.prisma.userRole.create({
  //         data: {
  //           user_id: user.id,
  //           role_id: memberRole.id,
  //         },
  //       });
  //     }
  //   }

  //   // Get roles
  //   const userRoles = await this.prisma.userRole.findMany({
  //     where: { user_id: user.id },
  //     include: { role: true },
  //   });

  //   // Logic to determine main role
  //   // In LoginController.dart: logic seems to simplify to one role.
  //   const roleName = userRoles.length > 0 ? userRoles[0].role?.name : 'member';

  //   const payload = { email: user.email, sub: user.id, role: roleName };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //     user: {
  //       ...user,
  //       role: roleName,
  //       profile_image: data.photoUrl // Echo back if needed, or fetch from files
  //     },
  //   };
  // }

  async validateUser(payload: any) {
    return await this.prisma.user.findUnique({
      where: { id: payload.sub }
    });
  }

  async registerOrSync(userData: any) {
  return this.prisma.user.create({
    data: {
      id: userData.uid, // WAJIB ADA: Masukkan UID dari Firebase sebagai ID
      name: userData.name,
      email: userData.email,
      password: userData.password || '12345678', // Dummy password
      phone_number: userData.phone_number,
    },
  });
}
}
