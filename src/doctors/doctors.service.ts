import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}
  create(createDoctorDto: CreateDoctorDto) {
    return 'This action adds a new doctor';
  }


  async findAll(polyId?: string) {
    const doctors = await this.prisma.doctor.findMany({
      where: {
        status: 1, // Hanya dokter aktif
        ...(polyId && { poly_id: polyId }), // Filter berdasarkan poli jika ada
      },
      include: {
        poly: true,   // Sertakan info poli
        clinic: true, // Sertakan info klinik
      },
      orderBy: { name: 'asc' },
    });

    return {
      message: "Data dokter berhasil diambil",
      result: doctors,
    };
  }

  async findOne(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id },
      include: {
        poly: true,
        clinic: true,
        scheduleDates: {
          include: { scheduleTimes: true } // Ambil jadwal prakteknya juga
        }
      },
    });

    if (!doctor) throw new NotFoundException('Dokter tidak ditemukan');

    return {
      message: "Detail dokter berhasil diambil",
      result: doctor,
    };
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
