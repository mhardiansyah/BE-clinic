import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Pastikan path import ini benar
import { MastersService } from './master.service';

@UseGuards(JwtAuthGuard) // Wajib Login (Pakai Token JWT)
@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @Get('clinics')
  getClinics() {
    return this.mastersService.getClinics();
  }

  @Get('polies/:clinicId')
  getPolies(@Param('clinicId') clinicId: string) {
    return this.mastersService.getPolies(clinicId);
  }

  @Get('doctors/:clinicId/:polyId')
  getDoctors(
    @Param('clinicId') clinicId: string,
    @Param('polyId') polyId: string,
  ) {
    return this.mastersService.getDoctors(clinicId, polyId);
  }

  @Get('schedule-dates/:polyId/:doctorId')
  getScheduleDates(
    @Param('polyId') polyId: string,
    @Param('doctorId') doctorId: string,
  ) {
    return this.mastersService.getScheduleDates(polyId, doctorId);
  }

  @Get('schedule-times/:dateId')
  getScheduleTimes(@Param('dateId') dateId: string) {
    return this.mastersService.getScheduleTimes(dateId);
  }
}