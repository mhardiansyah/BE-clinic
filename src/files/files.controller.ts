import { Controller, Post, Body, Get, Query, Delete, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Endpoint: POST https://be-clinic-rx7y.vercel.app/files/save
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveFile(
    @Body() body: {
      moduleClass: string;
      moduleId: string;
      fileName: string;
      fileType: string;
    },
  ) {
    return this.filesService.saveFileInfo(body);
  }

  // Endpoint: GET https://be-clinic-rx7y.vercel.app/files/find
  @Get('find')
  async getFile(
    @Query('moduleClass') moduleClass: string,
    @Query('moduleId') moduleId: string,
  ) {
    return this.filesService.findByModule(moduleClass, moduleId);
  }

  // Endpoint: DELETE https://be-clinic-rx7y.vercel.app/files/cancel
  @UseGuards(JwtAuthGuard)
  @Delete('cancel')
  async cancelFile(
    @Query('moduleClass') moduleClass: string,
    @Query('moduleId') moduleId: string,
  ) {
    return this.filesService.deleteFile(moduleClass, moduleId);
  }
}