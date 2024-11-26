import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    // Basic Information
    @Prop()
    propertyTitle: string;

    @Prop()
    Description: string;

    @Prop()
    Type: string;

    @Prop()
    Price: string;

    @Prop()
    Rooms: string;

      // // Gallery Images
      // @Prop({ type: [String] }) // Updated to array of strings
      // images: string[];
      
      @Prop() // Updated to array of strings
      image: string;

    // Details Information
    @Prop()
    PropertyId: string;

    @Prop()
    AreaSize: string;
    @Prop()
    Location: string;
    @Prop()
    SizePrefix: string;

    @Prop()
    LandArea: string;

    @Prop()
    Bedrooms: string;

    @Prop()
    Bathrooms: string;

    @Prop()
    Garages: string;

    @Prop()
    YearBuild: string;

    @Prop({ type: [String], default: [] })
    amenity: string[];

    // Property Contact Details
    @Prop()
    Name: string;

    @Prop()
    Email: string;

    @Prop()
    Phone: string;

 
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
