import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { BuilderService } from './builder.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('builder')
export class BuilderController {
  constructor(private readonly buildersService: BuilderService) {}

  @Post()
@UseInterceptors(FileInterceptor('builderLogo', {
  storage: diskStorage({
    destination: './uploads', // Folder where files will be saved
    filename: (req, file, callback) => {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      callback(null, filename);
    },
  }),
}))
async create(
  @Body() createBuilderDto: CreateBuilderDto,
  @UploadedFile() file: Express.Multer.File
) {
  if (file) {
    createBuilderDto.builderLogo = file.filename;
  }
  return this.buildersService.create(createBuilderDto);
}


  @Get()
  async findAll() {
    return this.buildersService.findAll();
  }

  @Get(':id')
  // Uncomment this if you want to enforce authentication
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.buildersService.findOne(id);
  }

  @Put(':id')
  // Uncomment this if you want to enforce authentication
  // @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateBuilderDto: CreateBuilderDto) {
    return this.buildersService.update(id, updateBuilderDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(@Param('id') id: string, @Body() updateBuilderDto: Partial<CreateBuilderDto>) {
    return this.buildersService.update(id, updateBuilderDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.buildersService.remove(id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async removeAll() {
    return this.buildersService.removeAll();
  }
}
