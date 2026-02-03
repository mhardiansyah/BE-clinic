import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { MastersService } from './masters.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class MastersController {
    constructor(private readonly mastersService: MastersService) { }

    @Get('doctors/:id')
    getDoctor(@Param('id') id: string) {
        return this.mastersService.getDoctor(id);
    }

    @Get('polies/:id')
    getPoly(@Param('id') id: string) {
        return this.mastersService.getPoly(id);
    }

    @Get('clinics/:id')
    getClinic(@Param('id') id: string) {
        return this.mastersService.getClinic(id);
    }

    @Get('schedule-dates/:id')
    getScheduleDate(@Param('id') id: string) {
        return this.mastersService.getScheduleDate(id);
    }

    @Get('schedule-times/:id')
    getScheduleTime(@Param('id') id: string) {
        return this.mastersService.getScheduleTime(id);
    }

    @Get('files')
    getFile(@Query('module_class') moduleClass: string, @Query('module_id') moduleId: string) {
        return this.mastersService.getFile(moduleClass, moduleId);
    }
}
