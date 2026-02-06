// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  // Simpan info file ke tabel 'files'
  async saveFileInfo(data: {
    module_class: string;
    module_id: string;
    file_name: string; // Ini akan berisi URL Cloudinary
    file_type: string;
  }) {
    return this.prisma.file.create({
      data: {
        module_class: data.module_class,
        module_id: data.module_id,
        file_name: data.file_name,
        file_type: data.file_type,
      },
    });
  }

  // Hapus info file berdasarkan ID modul (untuk fungsi cancel/delete)
  async deleteByModule(moduleClass: string, moduleId: string) {
    return this.prisma.file.deleteMany({
      where: {
        module_class: moduleClass,
        module_id: moduleId,
      },
    });
  }
}