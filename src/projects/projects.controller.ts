// import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CreateProjectDto } from './dto/create-project.dto';
// import { ProjectsService } from './projects.service';
// import { diskStorage } from 'multer';
// import { extname } from 'path';

// @Controller('projects')
// export class ProjectsController {
//   constructor(private readonly projectsService: ProjectsService) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('image', {
//     storage: diskStorage({
//       destination: './uploads', // Folder where files will be saved
//       filename: (req, file, callback) => {
//         const filename = `${Date.now()}${extname(file.originalname)}`;
//         callback(null, filename);
//       },
//     }),
//   }))
//   async create(
//     @Body() createProjectDto: CreateProjectDto,
//     @UploadedFile() file: Express.Multer.File
//   ) {
//     if (file) {
//       createProjectDto.image = file.filename;
//     }
//     return this.projectsService.create(createProjectDto);
//   }

//   @Get()
//   async findAll() {
//     return this.projectsService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.projectsService.findOne(id);
//   }

//   @Patch(':id')
//   async partialUpdate(
//     @Param('id') id: string,
//     @Body() updateData: CreateProjectDto // Use CreateProjectDto for update
//   ) {
//     return this.projectsService.update(id, updateData);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     return this.projectsService.remove(id);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createProjectDto.image = file.filename; // Assign the uploaded file's name to the DTO
    }
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async partialUpdate(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateProjectDto.image = file.filename; // Assign the uploaded file's name to the DTO
    }
    try {
      await this.projectsService.update(id, updateProjectDto);
      return {
        statusCode: HttpStatus.OK,
        message: `Project ${id} partially updated successfully`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
    return this.projectsService.remove(id);
  }
}
