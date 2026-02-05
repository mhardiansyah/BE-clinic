import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule
import { MastersController } from './master.controller';
import { MastersService } from './master.service';

@Module({
  imports: [PrismaModule], // Penting! Biar bisa akses Database
  controllers: [MastersController],
  providers: [MastersService],
})
export class MastersModule {}