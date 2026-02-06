import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  // Simpan info file (URL Cloudinary) ke tabel 'files'
  async saveFileInfo(data: {
    moduleClass: string;
    moduleId: string;
    fileName: string;
    fileType: string;
  }) {
    return this.prisma.file.create({
      data: {
        module_class: data.moduleClass,
        module_id: data.moduleId,
        file_name: data.fileName,
        file_type: data.fileType,
      },
    });
  }

  // Cari file berdasarkan relasi modul (buat nampilin di Summary)
  async findByModule(moduleClass: string, moduleId: string) {
    return this.prisma.file.findFirst({
      where: {
        module_class: moduleClass,
        module_id: moduleId,
      },
    });
  }

  // Hapus info file (jika user klik cancel/silang di UI)
  async deleteFile(moduleClass: string, moduleId: string) {
    return this.prisma.file.deleteMany({
      where: {
        module_class: moduleClass,
        module_id: moduleId,
      },
    });
  }
}