import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Global() // Membuat PrismaService tersedia di seluruh aplikasi tanpa perlu import berulang kali
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Wajib diekspor agar bisa digunakan di module lain
})
export class PrismaModule {}