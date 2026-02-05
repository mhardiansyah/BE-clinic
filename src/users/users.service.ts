import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userRoles: {
                    include: { role: true },
                },
            },
        });

        if (!user) return null;

        // Fetch profile image
        const file = await this.prisma.file.findFirst({
            where: { module_class: 'users', module_id: userId }
        });

        const roleName = user.userRoles.length > 0 ? user.userRoles[0].role?.name : 'member';

        return {
            ...user,
            role: roleName,
            imageUrl: file ? file.file_name : null
        };
    }
}
