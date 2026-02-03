import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MastersService {
    constructor(private prisma: PrismaService) { }

    async getDoctor(id: string) {
        return this.prisma.doctor.findUnique({ where: { id } });
    }

    async getPoly(id: string) {
        return this.prisma.poly.findUnique({ where: { id } });
    }

    async getClinic(id: string) {
        return this.prisma.clinic.findUnique({ where: { id } });
    }

    async getScheduleDate(id: string) {
        return this.prisma.scheduleDate.findUnique({ where: { id } });
    }

    async getScheduleTime(id: string) {
        return this.prisma.scheduleTime.findUnique({ where: { id } });
    }

    async getFile(moduleClass: string, moduleId: string) {
        return this.prisma.file.findFirst({
            where: { module_class: moduleClass, module_id: moduleId },
        });
    }
}
