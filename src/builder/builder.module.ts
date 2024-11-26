import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { Builder, BuilderSchema } from './schemas/builder.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Builder.name, schema: BuilderSchema }]),
    MulterModule.register({
      dest: './uploads', // Default destination for Multer uploads
    }),
  ],
  providers: [BuilderService],
  controllers: [BuilderController],
})
export class BuilderModule {}
