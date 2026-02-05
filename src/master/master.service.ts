import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  // 1. Ambil Semua Klinik
  async getClinics() {
    return this.prisma.clinic.findMany({
      orderBy: { name: 'asc' }, // Urutkan A-Z
    });
  }

  // 2. Ambil Poli berdasarkan ID Klinik
  async getPolies(clinicId: string) {
    return this.prisma.poly.findMany({
      where: { 
        clinic_id: clinicId,
        // status: 1 // Uncomment jika tabel Poly punya kolom status aktif/tidak
      },
      orderBy: { name: 'asc' },
    });
  }

  // 3. Ambil Dokter berdasarkan Klinik & Poli
  async getDoctors(clinicId: string, polyId: string) {
    return this.prisma.doctor.findMany({
      where: {
        clinic_id: clinicId,
        poly_id: polyId,
        status: 1, // Hanya dokter aktif
      },
      orderBy: { name: 'asc' },
    });
  }

  // 4. Ambil Tanggal Praktek berdasarkan Poli & Dokter
  async getScheduleDates(polyId: string, doctorId: string) {
    // Ambil tanggal mulai hari ini (agar user gak pilih tanggal masa lalu)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.scheduleDate.findMany({
      where: {
        poly_id: polyId,
        doctor_id: doctorId,
        schedule_date: {
          gte: today, // Greater than or equal to today
        },
      },
      orderBy: { schedule_date: 'asc' }, // Urutkan tanggal terdekat
    });
  }

  // 5. Ambil Jam Praktek berdasarkan ID Tanggal
  async getScheduleTimes(dateId: string) {
    return this.prisma.scheduleTime.findMany({
      where: { date_id: dateId },
      orderBy: { schedule_time: 'asc' }, // Urutkan jam
    });
  }
}