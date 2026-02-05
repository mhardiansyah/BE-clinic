import { Module } from '@nestjs/common';

import { MastersController } from './master.controller';
import { MastersService } from './master.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [MastersController],
  providers: [MastersService],
})
export class MastersModule {}