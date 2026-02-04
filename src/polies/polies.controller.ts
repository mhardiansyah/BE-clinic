import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
  findAll(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    return this.poliesService.findAll({ search, page, limit, sortBy, sortOrder });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
