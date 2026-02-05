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
      },
    });

    // Langsung kembalikan objeknya, biarkan Interceptor yang membungkus message
    return drug; 
  }

  async findAll(query: { 
    search?: string, 
    page?: number, 
    limit?: number, 
    sortBy?: string, 
    sortOrder?: 'asc' | 'desc',
    kind?: string 
  }) {
    const { 
      search, 
      page = 1, 
      limit = 10, 
      sortBy = 'name', 
      sortOrder = 'asc',
      kind 
    } = query;

    const skip = (page - 1) * limit;

    const where = {
      AND: [
        search ? { name: { contains: search, mode: 'insensitive' as const } } : {},
        kind ? { kind: { equals: kind } } : {},
      ]
    };

    const [drugs, total] = await Promise.all([
      this.prisma.drug.findMany({
        where,
        take: Number(limit),
        skip: Number(skip),
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.drug.count({ where }),
    ]);
    return drugs;
  }

  async findOne(id: string) {
    const drug = await this.prisma.drug.findUnique({
      where: { id },
    });

    if (!drug) throw new NotFoundException('Obat tidak ditemukan');
    return drug;
  }

  async update(id: string, updateDrugDto: UpdateDrugDto) {
    return this.prisma.drug.update({
      where: { id },
      data: updateDrugDto,
    });
  }

  async remove(id: string) {
    await this.prisma.drug.delete({
      where: { id },
    });
    return { id };
  }
}