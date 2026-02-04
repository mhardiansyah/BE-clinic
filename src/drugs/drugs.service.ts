import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DrugsService {
  constructor(private prisma: PrismaService) {}

  async create(createDrugDto: CreateDrugDto) {
    const drug = await this.prisma.drug.create({
      data: {
        ...createDrugDto,
        // Prisma otomatis menangani UUID jika di schema menggunakan @default(dbgenerated("gen_random_uuid()"))
      },
    });

    return {
      message: 'Obat baru berhasil ditambahkan',
      result: drug,
    };
  }

  async findAll(search?: string) {
    const drugs = await this.prisma.drug.findMany({
      where: {
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: { name: 'asc' },
    });

    return {
      message: 'Data obat berhasil diambil',
      result: drugs,
    };
  }

  async findOne(id: string) {
    const drug = await this.prisma.drug.findUnique({
      where: { id },
    });

    if (!drug) throw new NotFoundException('Obat tidak ditemukan');

    return {
      message: 'Detail obat berhasil diambil',
      result: drug,
    };
  }

  // Update id menjadi string karena kita menggunakan UUID
  async update(id: string, updateDrugDto: UpdateDrugDto) {
    const drug = await this.prisma.drug.update({
      where: { id },
      data: updateDrugDto,
    });

    return {
      message: 'Data obat berhasil diperbarui',
      result: drug,
    };
  }

  async remove(id: string) {
    await this.prisma.drug.delete({
      where: { id },
    });

    return {
      message: 'Obat berhasil dihapus',
    };
  }
}
