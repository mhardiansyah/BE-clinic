// backend/src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateAppointmentDto) {
    // Buat kode random 8 karakter untuk QR Code sesuai schema
    const qrCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    return this.prisma.appointment.create({
      data: {
        user_id: userId, // Ini String (Firebase UID)
        clinic_id: dto.clinic_id,
        poly_id: dto.poly_id,
        doctor_id: dto.doctor_id,
        date_id: dto.date_id,
        time_id: dto.time_id,
        symptoms: dto.symptoms,
        symptom_description: dto.symptom_description,
        qr_code: qrCode,
        status: 1, // 1 = Waiting
      },
      include: {
        clinic: true,
        doctor: true,
        poly: true,
      }
    });
  }

  async getMyAppointments(userId: string) {
    return this.prisma.appointment.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: {
        clinic: true,
        doctor: true,
        poly: true,
        date: true,
        time: true
      }
    });
  }
}