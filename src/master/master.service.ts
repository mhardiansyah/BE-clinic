import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Pastikan path relatif bener (../)

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  // 1. Ambil Semua Klinik
  async getClinics() {
    return this.prisma.clinic.findMany({
      orderBy: { name: 'asc' },
    });
  }

  // 2. Ambil Poli berdasarkan ID Klinik
  async getPolies(clinicId: string) {
    return this.prisma.poly.findMany({
      where: { clinic_id: clinicId },
      orderBy: { name: 'asc' },
    });
  }

  // 3. Ambil Dokter berdasarkan Klinik & Poli
  async getDoctors(clinicId: string, polyId: string) {
    return this.prisma.doctor.findMany({
      where: {
        clinic_id: clinicId,
        poly_id: polyId,
        status: 1, 
      },
      orderBy: { name: 'asc' },
    });
  }

  // 4. Ambil Tanggal Praktek (BAGIAN INI YANG KRUSIAL)
  async getScheduleDates(polyId: string, doctorId: string) {
    // KITA LONGGARKAN FILTERNYA UNTUK TESTING
    // Jika data di database lu adalah tanggal lama, gte: today akan bikin hasil kosong.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.scheduleDate.findMany({
      where: {
        poly_id: polyId,
        doctor_id: doctorId,
        // Uncomment gte: today nanti kalau data di database sudah lu update ke masa depan
        // schedule_date: {
        //   gte: today, 
        // },
      },
      orderBy: { schedule_date: 'asc' },
    });
  }

  // 5. Ambil Jam Praktek berdasarkan ID Tanggal
  async getScheduleTimes(dateId: string) {
    return this.prisma.scheduleTime.findMany({
      where: { date_id: dateId },
      orderBy: { schedule_time: 'asc' },
    });
  }

  async getSymptoms(polyId: string) {
  return this.prisma.symptom.findMany({
    where: { poly_id: polyId },
    orderBy: { en_name: 'asc' }, // Urutkan berdasarkan nama Inggris
  });
}
}