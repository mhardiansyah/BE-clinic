// backend/src/appointment/appointment.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
// @UseGuards(AuthGuard) // MATIKAN INI UNTUK LAPORAN BESOK
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    // Ambil user_id langsung dari dto, bukan dari req.user
    return this.appointmentService.create(dto.user_id, dto);
  }

  // Gunakan Query Parameter atau Path Parameter untuk ambil riwayat tanpa token
  @Get('user/:userId')
  async getMyHistory(@Param('userId') userId: string) {
    return this.appointmentService.getMyAppointments(userId);
  }
}