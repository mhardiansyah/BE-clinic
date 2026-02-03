import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
    constructor(private prisma: PrismaService) { }

    async findAllByUser(userId: string) {
        return this.prisma.appointment.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });
    }

    async findActiveByUser(userId: string) {
        const list = await this.prisma.appointment.findMany({
            where: {
                user_id: userId,
                status: 1
            },
            take: 1
        });
        return list.length > 0 ? list[0] : null;
    }
}
