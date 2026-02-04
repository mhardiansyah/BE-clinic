import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePolyDto } from './dto/create-poly.dto';
import { UpdatePolyDto } from './dto/update-poly.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PoliesService {
  constructor(private prisma: PrismaService) {}
  create(createPolyDto: CreatePolyDto) {
    return 'This action adds a new poly';
  }

  async findAll(query: { 
    search?: string, 
    page?: number, 
    limit?: number, 
    sortBy?: string, 
    sortOrder?: 'asc' | 'desc' 
  }) {
    const { 
      search, 
      page = 1, 
      limit = 10, 
      sortBy = 'name', 
      sortOrder = 'asc' 
    } = query;

    const skip = (page - 1) * limit;

    const where = search 
      ? { name: { contains: search, mode: 'insensitive' as const } } 
      : {};

    const [polies, total] = await Promise.all([
      this.prisma.poly.findMany({
        where,
        take: Number(limit),
        skip: Number(skip),
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.poly.count({ where }),
    ]);

    return {
      message: "Data poliklinik berhasil diambil",
      result: {
        data: polies,
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
    const poly = await this.prisma.poly.findUnique({
      where: { id },
    });

    if (!poly) throw new NotFoundException('Poliklinik tidak ditemukan');

    return {
      message: "Detail poliklinik berhasil diambil",
      result: poly,
    };
  }


  update(id: number, updatePolyDto: UpdatePolyDto) {
    return `This action updates a #${id} poly`;
  }

  remove(id: number) {
    return `This action removes a #${id} poly`;
  }
}
