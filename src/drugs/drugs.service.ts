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

  async findAll(query: { 
    search?: string, 
    page?: number, 
    limit?: number, 
    sortBy?: string, 
    sortOrder?: 'asc' | 'desc',
    kind?: string // Contoh filter kategori
  }) {
    const { 
      search, 
      page = 1, 
      limit = 10, 
      sortBy = 'name', 
      sortOrder = 'asc',
      kind 
    } = query;

    // Menghitung offset untuk pagination
    const skip = (page - 1) * limit;

    // 1. Definisikan Filter
    const where = {
      AND: [
        search ? { name: { contains: search, mode: 'insensitive' as const } } : {},
        kind ? { kind: { equals: kind } } : {},
      ]
    };

    // 2. Ambil data dan total count secara bersamaan
    const [drugs, total] = await Promise.all([
      this.prisma.drug.findMany({
        where,
        take: Number(limit),
        skip: Number(skip),
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.drug.count({ where }),
    ]);

    return {
      message: "Data obat berhasil diambil",
      result: {
        data: drugs,
        meta: {
          total,
          page: Number(page),
          last_page: Math.ceil(total / limit),
          limit: Number(limit),
        }
      },
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
