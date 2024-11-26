import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { Builder, BuilderDocument } from './schemas/builder.schema';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder.name) private builderModel: Model<BuilderDocument>) {}

  async create(createBuilderDto: CreateBuilderDto): Promise<{ message: string }> {
    const existingBuilder = await this.builderModel.findOne({ builderName: createBuilderDto.builderName }).exec();
    if (existingBuilder) {
      throw new ConflictException('Builder with this name already exists');
    }
    const createdBuilder = new this.builderModel(createBuilderDto);
    await createdBuilder.save();
    return { message: `Builder ${createBuilderDto.builderName} created successfully` };
  }

  async findAll(): Promise<Builder[]> {
    const builders = await this.builderModel.find().exec();
    return builders.map(builder => builder.toObject());
  }

  async findOne(id: string): Promise<Builder> {
    const builder = await this.builderModel.findById(id).exec();
    if (!builder) {
      throw new NotFoundException('Builder not found');
    }
    return builder.toObject();
  }

  async update(id: string, updateBuilderDto: Partial<CreateBuilderDto>): Promise<{ message: string }> {
    const updatedBuilder = await this.builderModel.findByIdAndUpdate(id, updateBuilderDto, { new: true }).exec();
    if (!updatedBuilder) {
      throw new NotFoundException('Builder not found');
    }
    return { message: `Builder ${updatedBuilder.builderName} updated successfully` };
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedBuilder = await this.builderModel.findByIdAndDelete(id).exec();
    if (!deletedBuilder) {
      throw new NotFoundException('Builder not found');
    }
    return {
      message: `Builder ${deletedBuilder.builderName} deleted successfully`
    };
  }

  async removeAll(): Promise<{ message: string }> {
    await this.builderModel.deleteMany().exec();
    return {
      message: 'All builders deleted successfully'
    };
  }
}
