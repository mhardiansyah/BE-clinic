import { Controller, Get, Post, Body, UseGuards, Request, Param, Query } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
// @UseGuards(JwtAuthGuard) // Melindungi semua endpoint di controller ini
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Request() req, @Body() dto: CreateAppointmentDto) {
    // req.user.userId didapat dari JwtStrategy yang kita buat sebelumnya
    return this.appointmentService.create(req.user.userId, dto);
  }

  @Get('my-history')
  // async getMyHistory(@Request() req) {
  //   // req.user.userId didapat otomatis dari payload JWT saat login
  //   return this.appointmentsService.findMyHistory(req.user.userId);
  // }
  async getMyHistory(@Query('userId') userId: string) {
    // Sekarang userId dikirim via URL, misal: /appointments/my-history?userId=xxx
    return this.appointmentService.findMyHistory(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }
}

