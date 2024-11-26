import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuilderDocument = Builder & Document;

@Schema({ timestamps: true })
export class Builder {
  @Prop({ required: true })
  builderName: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  officeAddress: string;

  @Prop()
  builderLogo: string; // Store filename of the uploaded image

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const BuilderSchema = SchemaFactory.createForClass(Builder);
