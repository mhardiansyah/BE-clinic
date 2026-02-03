import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateAppointmentDto) {
    // 1. Simpan data appointment ke database
    const appointment = await this.prisma.appointment.create({
      data: {
        user_id: userId,
        ...dto,
        status: 1, // Status awal (Pending/Scheduled)
      },
    });

    return {
      message: "Janji temu berhasil dibuat",
      result: appointment,
    };
  }

  async findMyAppointments(userId: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: { user_id: userId },
      include: {
        doctor: true,
        poly: true,
        clinic: true,
        date: true,
        time: true,
      },
      orderBy: { created_at: 'desc' },
    });

    return {
      message: "Riwayat janji temu berhasil diambil",
      result: appointments,
    };
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        poly: true,
        clinic: true,
        date: true,
        time: true,
      },
    });

    if (!appointment) throw new NotFoundException('Janji temu tidak ditemukan');

    return {
      message: "Detail janji temu berhasil diambil",
      result: appointment,
    };
  }
}