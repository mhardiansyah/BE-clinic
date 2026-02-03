import { Injectable } from '@nestjs/common';
import { CreatePolyDto } from './dto/create-poly.dto';
import { UpdatePolyDto } from './dto/update-poly.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PoliesService {
  constructor(private prisma: PrismaService) {}
  create(createPolyDto: CreatePolyDto) {
    return 'This action adds a new poly';
  }

  async findAll() {
    // Mengambil semua data poli
    const polies = await this.prisma.poly.findMany({
      where: { status: 1 }, // Hanya ambil yang aktif jika ada kolom status
      orderBy: { name: 'asc' }
    });

    return {
      message: "Data poli berhasil diambil",
      result: polies
    };
  }

  async findOne(id: string) {
    const poly = await this.prisma.poly.findUnique({
      where: { id },
      include: { doctors: true } // Contoh: Ambil juga daftar dokter di poli tersebut
    });

    return {
      message: "Detail poli berhasil diambil",
      result: poly
    };
  }


  update(id: number, updatePolyDto: UpdatePolyDto) {
    return `This action updates a #${id} poly`;
  }

  remove(id: number) {
    return `This action removes a #${id} poly`;
  }
}
