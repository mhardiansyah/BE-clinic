import { Module } from '@nestjs/common';

import { MastersController } from './master.controller';
import { MastersService } from './master.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Penting! Biar bisa akses Database
  controllers: [MastersController],
  providers: [MastersService],
})
export class MastersModule {}