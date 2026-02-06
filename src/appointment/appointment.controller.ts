import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Pastikan path ini benar sesuai struktur foldermu

@UseGuards(JwtAuthGuard) // <--- SEMUA ROUTE DI SINI AMAN (WAJIB LOGIN)
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // 1. Buat Appointment Baru (Dipanggil saat klik 'Next' di Tab Schedule)
  @Post()
  create(@Request() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    // req.user.userId otomatis ada karena JwtStrategy kita
    return this.appointmentService.create(req.user.userId, createAppointmentDto);
  }

  // 2. Update Gejala (Dipanggil saat klik 'Next' di Tab Symptom)
  @Patch(':id/symptoms')
  updateSymptoms(
    @Param('id') id: string,
    @Body() body: { symptoms: string, symptom_description: string },
  ) {
    return this.appointmentService.updateSymptoms(id, body);
  }

  // 3. Ambil Semua Appointment User (Untuk Halaman History/Medical Records)
  @Get()
  findAll(@Request() req) {
    return this.appointmentService.getMyAppointments(req.user.userId);
  }

  // 4. Ambil Detail Satu Appointment
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.appointmentService.getOne(req.user.userId, id);
  }

  
}