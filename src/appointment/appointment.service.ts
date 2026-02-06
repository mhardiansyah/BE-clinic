import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  // --- STEP 1: CREATE APPOINTMENT (SCHEDULE TAB) ---
  async create(userId: string, dto: CreateAppointmentDto) {
    // Generate QR Code Random (8 Karakter Uppercase)
    const qrCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    return this.prisma.appointment.create({
      data: {
        user_id: userId, // Diambil dari Token JWT (Aman!)
        clinic_id: dto.clinic_id,
        poly_id: dto.poly_id,
        doctor_id: dto.doctor_id,
        date_id: dto.date_id,
        time_id: dto.time_id,
        symptoms: dto.symptoms || null,
        symptom_description: dto.symptom_description || null,
        qr_code: qrCode,
        status: 1, // Status 1 = Waiting
      },
      // Include Relasi: Agar Flutter dapet data lengkap (Nama Dokter, Klinik, Jam)
      include: {
        clinic: true,
        doctor: true,
        poly: true,
        date: true,
        time: true,
      },
    });
  }

  // --- STEP 3: UPDATE SYMPTOMS (SYMPTOM TAB) ---
  async updateSymptoms(
    id: string,
    data: { symptoms: string; symptom_description: string },
  ) {
    return this.prisma.appointment.update({
      where: { id: id },
      data: {
        symptoms: data.symptoms,
        symptom_description: data.symptom_description,
        // Status 1 biasanya berarti 'Scheduled/Confirmed' setelah gejala diisi
        status: 1,
      },
    });
  }

  // --- GET ALL MY APPOINTMENTS (HISTORY) ---
  async getMyAppointments(userId: string) {
    return this.prisma.appointment.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      include: {
        clinic: true,
        doctor: true,
        poly: true,
        date: true,
        time: true,
      },
    });
  }

  // --- GET SINGLE APPOINTMENT DETAIL ---
  async getOne(userId: string, appointmentId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        user_id: userId, // Pastikan cuma bisa liat punya sendiri
      },
      include: {
        clinic: true,
        doctor: true,
        poly: true,
        date: true,
        time: true,
      },
    });

    if (!appointment) throw new NotFoundException('Data tidak ditemukan');
    return appointment;
  }

  async getSummary(id: string) {
    const summary = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        clinic: true,
        poly: true,
        doctor: true,
        date: true, // Ganti dari schedule_date ke date
        time: true, // Ganti dari schedule_time ke time
        // Jika relasi files belum ada di schema.prisma model Appointment, 
        // bagian ini mending di-comment dulu biar build-nya lewat.
        /*
        files: {
          where: { module_class: 'appointments' }
        }
        */
      },
    });

    if (!summary) throw new NotFoundException('Appointment not found');
    
    let symptomDetails: any[] = [];
    if (summary.symptoms) {
      const symptomIds = summary.symptoms.split(',');
      symptomDetails = await this.prisma.symptom.findMany({
        where: { id: { in: symptomIds } }
      });
    }

    return { ...summary, symptomDetails };
  }
}
