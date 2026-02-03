import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @Get()
    async findAll(@Req() req) {
        return this.appointmentsService.findAllByUser(req.user.id);
    }

    @Get('active')
    async findActive(@Req() req) {
        return this.appointmentsService.findActiveByUser(req.user.id);
    }
}
