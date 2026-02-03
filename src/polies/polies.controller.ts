import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PoliesService } from './polies.service';
import { CreatePolyDto } from './dto/create-poly.dto';
import { UpdatePolyDto } from './dto/update-poly.dto';

@Controller('polies')
export class PoliesController {
  constructor(private readonly poliesService: PoliesService) {}

  @Post()
  create(@Body() createPolyDto: CreatePolyDto) {
    return this.poliesService.create(createPolyDto);
  }

  @Get()
  async findAll() {
    return this.poliesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.poliesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolyDto: UpdatePolyDto) {
    return this.poliesService.update(+id, updatePolyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poliesService.remove(+id);
  }
}
