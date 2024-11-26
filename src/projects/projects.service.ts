// import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateProjectDto } from './dto/create-project.dto';
// import { Project, ProjectDocument } from './schemas/project.schema';

// @Injectable()
// export class ProjectsService {
//   constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

//   async create(createProjectDto: CreateProjectDto): Promise<{ message: string }> {
//     const existingProject = await this.projectModel.findOne({ propertyTitle: createProjectDto.propertyTitle }).exec();
//     if (existingProject) {
//       throw new ConflictException('Project with this title already exists');
//     }
//     const createdProject = new this.projectModel(createProjectDto);
//     await createdProject.save();
//     return { message: `Project ${createProjectDto.propertyTitle} created successfully` };
//   }

//   async findAll(): Promise<Project[]> {
//     const projects = await this.projectModel.find().exec();
//     return projects.map(project => project.toObject());
//   }

//   async findOne(id: string): Promise<Project> {
//     const project = await this.projectModel.findById(id).exec();
//     if (!project) {
//       throw new NotFoundException('Project not found');
//     }
//     return project.toObject();
//   }
  
//   async update(id: string, updateData: CreateProjectDto): Promise<{ message: string }> {
//     const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
//     if (!updatedProject) {
//       throw new NotFoundException('Project not found');
//     }
//     return { message: `Project ${updatedProject.propertyTitle} updated successfully` };
//   }

//   async remove(id: string): Promise<{ message: string }> {
//     const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
//     if (!deletedProject) {
//       throw new NotFoundException('Project not found');
//     }
//     return {
//       message: `Project ${deletedProject.propertyTitle} deleted successfully`
//     };
//   }
// }



import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(createProjectDto: CreateProjectDto): Promise<{ message: string }> {
    const existingProject = await this.projectModel.findOne({ propertyTitle: createProjectDto.propertyTitle }).exec();
    if (existingProject) {
      throw new ConflictException('Project with this title already exists');
    }
    const createdProject = new this.projectModel(createProjectDto);
    await createdProject.save();
    return { message: `Project ${createProjectDto.propertyTitle} created successfully`};
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project.toObject();
  }
  
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<{ message: string }> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    project.set(updateProjectDto); // Update only the fields provided
    await project.save();
    return { message: `Project ${id} updated successfully` };
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!id) {
      throw new BadRequestException('ID must be provided');
    }
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException('Project not found');
    }
    return {
      message: `Project ${deletedProject.propertyTitle} deleted successfully`
    };
  }
}

