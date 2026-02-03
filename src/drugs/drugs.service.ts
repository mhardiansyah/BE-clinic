import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DrugsService {
  constructor(private prisma: PrismaService) {}
  create(createDrugDto: CreateDrugDto) {
    return 'This action adds a new drug';
  }

  async findAll(search?: string) {
    const drugs = await this.prisma.drug.findMany({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive', // Tidak peduli huruf besar/kecil
          },
        }),
      },
      orderBy: { name: 'asc' },
    });

    return {
      message: "Data obat berhasil diambil",
      result: drugs,
    };
  }

  async findOne(id: string) {
    const drug = await this.prisma.drug.findUnique({
      where: { id },
    });

    if (!drug) throw new NotFoundException('Obat tidak ditemukan');

    return {
      message: "Detail obat berhasil diambil",
      result: drug,
    };
  }

  update(id: number, updateDrugDto: UpdateDrugDto) {
    return `This action updates a #${id} drug`;
  }

  remove(id: number) {
    return `This action removes a #${id} drug`;
  }
}
