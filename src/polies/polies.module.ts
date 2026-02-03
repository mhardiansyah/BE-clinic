import { Module } from '@nestjs/common';
import { PoliesService } from './polies.service';
import { PoliesController } from './polies.controller';

@Module({
  controllers: [PoliesController],
  providers: [PoliesService],
})
export class PoliesModule {}
